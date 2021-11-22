import SockJS from "sockjs-client";
import { v4 as uuid } from "uuid";
import pako from "pako";

import base64StringTest from "tools/base64-string-test";
import textDecoder from "tools/text-decoder";
import { formateDateStringToTimeStamp } from "tools/formateDateStringToTimeStamp";

import {
  HeartbeatSubject,
  SessionIdSubject,
  BidAskSubject,
  KLineSubject,
  TickSubject,
  UpdateEventSubject,
} from "./subject";
import {
  Mode,
  COLUMN_OF_SYMBOL,
  KLineMessage,
  BidAskMessage,
  BidAskMeta,
  TickMessage as TickMessageModel,
  UpdateEventMessage,
} from "./model";

export interface Parameter {
  url: string;
  onClose: () => void;
}

export function connectWebSocket({ url, onClose }: Parameter) {
  const sock = new SockJS(url, null, {
    sessionId: () => window.btoa(`${uuid()}$apex@tw`),
  });

  sock.onopen = function () {
    console.log(`{ quote } web socket [onOpen], open on: ${sock.url}`);
  };

  sock.onclose = function () {
    console.log("{ quote } web socket [onClose]");
    onClose();
  };

  sock.onerror = (e) => {
    console.log(`{ quote } web socket [onError], reason: ${e}`);
  };

  sock.onmessage = ({ data }) => {
    const res = JSON.parse(
      base64StringTest(data)
        ? textDecoder(pako.inflate(window.atob(data)))
        : data
    );

    if (isHeartBeatMessage(res)) {
      sock.send("got it!!");
      handleGetHeartBeatMessage(res);
      return;
    }

    if (isSessionIdMessage(res)) {
      handleGetSessionIdMessage(url, res);
      return;
    }

    const mode = res["11000"] as Mode;

    switch (mode) {
      case Mode.UPDATE_BA:
        console.log('{ quote } web socket [onMessage]: "BA"', res);
        handleGetBidAskMessage(res);
        return;
      case Mode.ADD_TICK:
        console.log('{ quote } web socket [onMessage]: "TICK"', res);
        handleGetTickMessage(res);
        return;
      case Mode.UPDATE_K_LINE:
        console.log('{ quote } web socket [onMessage]: "KLINE"', res);
        handleGetKLineMessage(res);
        return;
      case Mode.UPDATE_EVENT:
        // console.log('{ quote } web socket [onMessage]: "UPDATE_EVENT"', res);
        handleGetUpdateEventMessage(res);
        return;
      default:
        console.log('{ quote } web socket [onMessage]: "unknown"');
        return;
    }
  };

  return sock;
}

function isHeartBeatMessage(res: any): boolean {
  return res.hasOwnProperty("heartbeat");
}

function isSessionIdMessage(res: any): boolean {
  return typeof res.SessionID !== "undefined";
}

function handleGetHeartBeatMessage(res: any): void {
  HeartbeatSubject.next();
}

function handleGetSessionIdMessage(from: string, res: any): void {
  const sessionId = res.SessionID;
  SessionIdSubject.next({
    from,
    sessionId,
  });
}

function handleGetKLineMessage(res: any): void {
  const symbol = res[COLUMN_OF_SYMBOL];
  const tickData = res["11504"];
  const tickTime = formateDateStringToTimeStamp(tickData["273"]);

  const kLineMessage: KLineMessage = {
    symbol,
    tickTime: tickTime,
    open: tickData["1025"],
    high: tickData["332"],
    low: tickData["333"],
    price: tickData["31"],
    vol: tickData["12041"],
    totalVolume: tickData["1020"],
  };

  KLineSubject.next(kLineMessage);
}

function handleGetBidAskMessage(res: any): void {
  const symbol = res[COLUMN_OF_SYMBOL];
  const bidAskData = res["11503"];

  const result: BidAskMessage = {
    symbol,
    Bid: bidAskData["12011"].map(
      ({ 270: Price, 271: Vol }: any): BidAskMeta => ({
        Price,
        Vol,
      })
    ),
    Ask: bidAskData["12012"].map(
      ({ 270: Price, 271: Vol }: any): BidAskMeta => ({
        Price,
        Vol,
      })
    ),
  };
  BidAskSubject.next(result);
}

function handleGetUpdateEventMessage(res: any): void {
  UpdateEventSubject.next(transformUpdateEventMessage(res));
}

function transformUpdateEventMessage(res: any): UpdateEventMessage {
  return {
    eventType: res["12013"],
    eventTime: formateDateStringToTimeStamp(res["273"], "Date"),
    filterColumn: res["12014"],
    filterVal: res["12015"],
    columnListCount: res["870"],
    columnList: res["12016"]?.map((each: any) => ({
      columnName: each[871],
      columnValue: each[872],
    })),
  };
}

interface TickMessage {
  "48": string; //Symbol
  "11000": 51; //Mode
  "11001": "F"; //SecType
  "11500": {
    "14": number; //TotalVolume
    "273": string; //TickTime
    "339": number; //tradeType
    "12010": [
      {
        "31": number; //Price
        "1020": number; //volume
        "12031": 0 | 1 | 2; // Type
      }
    ];
    "12027": number; //NoVolCnt
    "12028": [
      {
        "12029": number; //Price
        "12030": number; //Vol
      }
    ];
  }; //Tick,
  "11501": {
    "14": number; //TotalVolume
    "31": number; //Price
    "332": number; //High
    "333": number; //Low
    "340": 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; //TradeStatus
    "645": number; //BidPrice
    "646": number; //AskPrice
    "647": number; //BidVolume
    "648": number; //AskVolume
    "1025": number; //Open
    "1150": number; //PrePrice
    "12002": number; //Up down
    "12003": number; //Up down rate
    "12006": number; //Buy count
    "12007": number; //Sell count
  }; //Quote;
}

function handleGetTickMessage(res: TickMessage): void {
  const symbol = res["48"];
  const quote = res["11501"];
  const tick = res["11500"];
  const volume = tick[12010][tick[12010].length - 1]["1020"];

  let tickMessage: TickMessageModel = {
    symbol,
    askPrice: quote["646"],
    askVolume: quote["648"],
    bidPrice: quote["645"],
    bidVolume: quote["647"],
    open: quote["1025"],
    price: quote["31"],
    volume: volume,
    totalVolume: quote["14"],
    upDown: quote["12002"],
    upDownRate: quote["12003"],
    high: quote["332"],
    low: quote["333"],
    prePrice: quote["1150"],
    buyCount: quote["12006"],
    sellCount: quote["12007"],
    tickTime: formateDateStringToTimeStamp(tick[273]),
    tradeType: tick["339"],
  };

  TickSubject.next(tickMessage);
}
