import { AxiosInstance } from "axios";

import { Quote as QuoteModel } from "model/Quote";

import { formateDateStringToTimeStamp } from "tools/formateDateStringToTimeStamp";
import getEnv from "tools/getEnv";
import { ScaleItem } from "model/productsTree";

export interface GetQuoteResponse {
  SessionID: string;
  Prods?: ProductQuote[] | null;
}

export interface ProductQuote {
  QrySymbol: string;
  QryISIN: string;
  Symbol: string;
  Quote: {
    14: string | null;
    17: string;
    31: string | null;
    48: string | null;
    55: string | null;
    200: string | null;
    201: string | null;
    202: string | null;
    205: string | null;
    273: string | null;
    332: string | null;
    333: string | null;
    339: string | null;
    340: string | null;
    342: string;
    344: string;
    527: string | null;
    645: string | null;
    646: string | null;
    647: string | null;
    648: string | null;
    916: string | null;
    917: string | null;
    1020: string | null;
    1025: string | null;
    1148: string | null;
    1149: string | null;
    1150: string | null;
    1151: string | null;
    1227: string | null;
    2162: string | null;
    11505: string | null;
    12002: string | null;
    12003: string | null;
    12006: string | null;
    12007: string | null;
    12009: string | null;
    12024: string | null;
    12026: string | null;
    12031: string | null;
    12032: string | null;
    12033: string | null;
    20101: string | null;
    20102: string | null;
    20103: string | null;
    20104: string | null;
    20106: string | null;
    20107: string | null;
    20109: string | null;
    20110: string | null;
    20111: string | null;
    20112: string | null;
    20113: string | null;
    20114: string | null;
    20115: string | null;
    20116: string | null;
    20117: string | null;
    20118: string | null;
    20122: string | null;
    20123: string | null;
    20201: string | null;
    20203: string | null;
    20206: string | null;
    20301: string | null;
    20302: string | null;
    20303: string | null;
    20304: string | null;
    29000: string | null;
    29001: string | null;
    29002: string | null;
    29003: string | null;
    30153: string | null;
    ClearDate: string | null;
    DayStop: string | null;
    STS: string | null;
    SecurityGroup: string | null;
    SessionGapE: string | null;
    SessionGapS: string | null;
    StopTradeEnd: string | null;
    StopTradeStart: string | null;
    SymbolDate: string | null;
    TO: string | null;
    TSStatus: string | null;
    TrType: string | null;
    RegularizeCode: string;
    TM: string;
    formatDecimal: string;
  };
  Bid: BidAskMeta[];
  Ask: BidAskMeta[];
  NV: null;
}

export interface BidAskMeta {
  Price: string;
  Vol: string;
  PriceVal: number;
}

export function quoteFormatter(product: ProductQuote): QuoteModel {
  let { Symbol, Quote, Bid, Ask } = product;

  const priceDecimal =
    Quote["20113"] !== null && Quote["20113"] !== ""
      ? parseFloat(Quote["20113"]!)
      : 4;
  const numberAddDecimalCurring = numberAddDecimalCurry(priceDecimal);

  const scaleItemsUnParse = Quote["11505"]
    ? JSON.parse(Quote["11505"])
    : undefined;
  const scaleItems: ScaleItem[] =
    scaleItemsUnParse?.[12035]?.map((item: any) => ({
      ScopeMin: item["12036"],
      ScopeMax: item["12037"],
      Numerator: item["12038"],
      Denominator: item["12039"],
      MinMovement: item["12040"],
    })) || [];

  return {
    Symbol,
    Name: Quote["55"],
    NameSlave: Quote["30153"],
    Exchange: Quote["17"],
    AskPrice: !!Quote["646"] ? numberAddDecimalCurring(Quote["646"]) : null,
    AskVolume: !!Quote["648"] ? parseInt(Quote["648"]) : null,
    BidPrice: !!Quote["645"] ? numberAddDecimalCurring(Quote["645"]) : null,
    BidVolume: !!Quote["647"] ? parseInt(Quote["647"]) : null,
    Open: !!Quote["1025"] ? numberAddDecimalCurring(Quote["1025"]) : null,
    Price: !!Quote["31"] ? numberAddDecimalCurring(Quote["31"]) : null,
    TotalVolume: !!Quote["14"] ? parseInt(Quote["14"]) : null,
    TradeStat: Quote["20203"],
    TradeStatCode: Quote["340"],
    UpDown: !!Quote["12002"] ? numberAddDecimalCurring(Quote["12002"]) : null,
    UpDownRate: !!Quote["12003"] ? parseInt(Quote["12003"]) / 100 : null,
    High: !!Quote["332"] ? numberAddDecimalCurring(Quote["332"]) : null,
    Low: !!Quote["333"] ? numberAddDecimalCurring(Quote["333"]) : null,
    PriceDec: !!Quote["20113"] ? parseInt(Quote["20113"]) : null,
    StrikeDec: !!Quote["20114"] ? parseInt(Quote["20114"]) : null,
    HighLimitPrice: !!Quote["1149"]
      ? numberAddDecimalCurring(Quote["1149"])
      : null,
    LowLimitPrice: !!Quote["1148"]
      ? numberAddDecimalCurring(Quote["1148"])
      : null,
    BuyCount: !!Quote["12006"] ? parseInt(Quote["12006"]) : null,
    SellCount: !!Quote["12007"] ? parseInt(Quote["12007"]) : null,
    DealType: Quote["12031"],
    StaBidOrder: Quote["20301"],
    StaBidVolume: Quote["20302"],
    StaAskOrder: Quote["20303"],
    StaAskVol: Quote["20304"],
    NowPrice: Quote["20115"],
    OpenInterest: !!Quote["20116"] ? parseInt(Quote["20116"]) : null,
    StockCode: Quote["20117"],
    ProdType: Quote["1151"],
    lastCoverTickTime: Quote["273"]
      ? formateDateStringToTimeStamp(Quote["273"], "Date")
      : null,
    Volume: Quote["1020"],
    StrikePrice: Quote["202"],
    PutOrCall: Quote["201"],
    FBidPrice: !!Quote["29000"]
      ? numberAddDecimalCurring(Quote["29000"]!)
      : null,
    FBidVol: Quote["29001"],
    FAskPrice: !!Quote["29002"]
      ? numberAddDecimalCurring(Quote["29002"]!)
      : null,
    FAskVol: Quote["29003"],
    PrePrice: !!Quote["1150"] ? numberAddDecimalCurring(Quote["1150"]!) : null,
    OpenTime: Quote["342"]
      ? formateDateStringToTimeStamp(Quote["342"], "Date")
      : new Date(0),
    CloseTime: Quote["344"]
      ? formateDateStringToTimeStamp(Quote["344"], "Date")
      : new Date(8640000000000000),
    SymbolDate: Quote["SymbolDate"],
    PreVolume: Quote["12009"],
    Bids: !!Bid
      ? Bid.map(({ Price, Vol }) => ({
          Price: numberAddDecimalCurring(Price),
          Volume: parseInt(Vol),
        }))
      : [],
    Asks: !!Ask
      ? Ask.map(({ Price, Vol }) => ({
          Price: numberAddDecimalCurring(Price),
          Volume: parseInt(Vol),
        }))
      : [],
    MaturityMonthYear: Quote["200"],
    Type: Quote["1227"],
    AliasSymbol: Quote["48"],
    ScaleItems: scaleItems,
    SessionGapE: Quote["SessionGapE"]
      ? formateDateStringToTimeStamp(Quote["SessionGapE"], "Date")
      : "",
    SessionGapS: Quote["SessionGapS"]
      ? formateDateStringToTimeStamp(Quote["SessionGapS"], "Date")
      : "",
    SpreadReverse: Quote["20123"] !== "0",
    Tradeable: Quote["TM"] !== "0",
    RegularizeCode: Quote["RegularizeCode"],
    MaxDenominator: Math.max(...scaleItems.map((each) => each.Denominator)),
    showDayAndNightBtn: judgeShowDayAndNightBtnOrNot(
      Quote["344"],
      Quote["342"]
    ), //判斷是否為當日顯示日夜盤
    formatDecimal: Quote["formatDecimal"],
  };
}

const numberAddDecimalCurry =
  (decimal: number) =>
  (value: string): number => {
    const data = parseFloat(value);
    if (isNaN(data)) {
      throw Error("It's not a number");
    }
    const priceDecimal = Math.pow(10, decimal);
    return data / priceDecimal;
  };
//判斷是否顯示日夜盤
const judgeShowDayAndNightBtnOrNot = (day1: string, day2: string): boolean => {
  if (day1.length > 0 && day2.length > 0) {
    if (day1.slice(0, 8) === day2.slice(0, 8)) {
      //同一天不顯示日夜盤
      return false;
    } else {
      return true;
    }
  }
  return false;
};

export interface GetQuotesParameter {
  symbols: string | string[];
  sessionId: string;
  others?: object;
}

export async function getQuotes(
  axios: AxiosInstance,
  { symbols, sessionId, others }: GetQuotesParameter
) {
  const requestData = JSON.stringify({
    SessionId: sessionId,
    Prods: Array.isArray(symbols) ? symbols : [symbols],
    ...others,
  });
  const { data } = await axios.post<GetQuoteResponse>(
    `/api/basicQuote`,
    requestData,
    {
      baseURL: getEnv("QUOTE_SLAVE_URL"),
    }
  );

  return Array.isArray(data.Prods) ? data.Prods.map(quoteFormatter) : [];
}
