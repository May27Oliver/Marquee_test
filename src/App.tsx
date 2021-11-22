import React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import Stock from "container/Stock";
import SockJs from "sockjs-client";

import {
  ApexProvider,
  useApexDispatchContext,
  useApexContext,
} from "context/Apex";
import {
  connectQuoteWebSocket,
  SessionIdSubject as QuoteSessionIdSubject,
} from "websocket/quote";
import { getEnv } from "tools/getEnv";
import CSpeedTrain from "container/CSpeedTrain";

function useListenApexSessionIdSubject() {
  const dispatch = useApexDispatchContext();
  React.useEffect(() => {
    const subscriber = QuoteSessionIdSubject.subscribe(
      ({ from, sessionId }) => {
        if (
          from ===
          `${getEnv("QUOTE_MASTER_URL")}${getEnv(
            "QUOTE_MASTER_SOCKET_END_POINT"
          )}`
        ) {
          dispatch({ type: "SET_MASTER_SESSION_ID", payload: sessionId });
        }
        if (
          from ===
          `${getEnv("QUOTE_SLAVE_URL")}${getEnv(
            "QUOTE_SLAVE_SOCKET_END_POINT"
          )}`
        ) {
          dispatch({ type: "SET_SLAVE_SESSION_ID", payload: sessionId });
        }
      }
    );
    return () => {
      subscriber.unsubscribe();
    };
  }, [dispatch]);
}
function useConnectMasterQuoteSocket() {
  const [{ masterSocket: quoteSocket }, apexInfoDispatch] = useApexContext();
  React.useEffect(() => {
    if (quoteSocket !== null) {
      return;
    }
    const socket = connectQuoteWebSocket({
      url: `${getEnv("QUOTE_MASTER_URL")}${getEnv(
        "QUOTE_MASTER_SOCKET_END_POINT"
      )}`,
      onClose: () => {
        apexInfoDispatch({ type: "CLOSE_MASTER_SOCKET" });
      },
    });
    apexInfoDispatch({ type: "SET_MASTER_SOCKET", payload: socket });

    return () => {
      if (socket?.readyState === SockJs.OPEN) {
        socket.send("disconnect");
        apexInfoDispatch({ type: "CLOSE_MASTER_SOCKET" });
      }
    };
  }, [quoteSocket, apexInfoDispatch]);
}

function useConnectSlaveQuoteSocket() {
  const [{ masterSocket: quoteSocket }, apexInfoDispatch] = useApexContext();
  React.useEffect(() => {
    if (quoteSocket !== null) {
      return;
    }
    const socket = connectQuoteWebSocket({
      url: `${getEnv("QUOTE_SLAVE_URL")}${getEnv(
        "QUOTE_SLAVE_SOCKET_END_POINT"
      )}`,
      onClose: () => {
        apexInfoDispatch({ type: "CLOSE_SLAVE_SOCKET" });
      },
    });

    apexInfoDispatch({ type: "SET_SLAVE_SOCKET", payload: socket });

    return () => {
      if (socket?.readyState === SockJs.OPEN) {
        socket.send("disconnect");
        apexInfoDispatch({ type: "CLOSE_SLAVE_SOCKET" });
      }
    };
  }, [quoteSocket, apexInfoDispatch]);
}

const App: React.FC = () => {
  useListenApexSessionIdSubject();
  useConnectMasterQuoteSocket();
  useConnectSlaveQuoteSocket();
  return (
    <div className="App">
      <CSpeedTrain
        symbols={[
          "2330.TW",
          "0050.TW",
          "2883.TW",
          "4938.TW",
          "00881.TW",
          "2481.TW",
          "2701.TW",
        ]}
      />
      {/* <Stock symbol={"2701.TW"} /> */}
    </div>
  );
};

const AppProvider: React.FC = ({ children }) => {
  return <ApexProvider>{children}</ApexProvider>;
};

export default hot(() => (
  <AppProvider>
    <App />
  </AppProvider>
));
/*
 <Swiper6
          list={[
            {
              no: "2481",
              title: "強茂",
              consumerate: "0.42",
              up: false,
              price: "95",
              consumeNum: "0.4",
              pic: Bear,
            },
            {
              no: "2330",
              title: "台積電",
              consumerate: "0.34",
              price: "588",
              up: true,
              consumeNum: "0.4",
              pic: Bull,
            },
            {
              no: "2317",
              title: "鴻海",
              consumerate: "0.40",
              price: "109.5",
              up: true,
              consumeNum: "0.2",
              pic: Bull,
            },
            {
              no: "2454",
              title: "聯發科",
              consumerate: "4.97",
              price: "857",
              up: true,
              consumeNum: "18.5",
              pic: Bull,
            },
            {
              no: "2303",
              title: "聯電",
              consumerate: "4.23",
              price: "59.10",
              up: true,
              consumeNum: "2.40",
              pic: Bull,
            },
            {
              no: "2303",
              title: "廣達",
              consumerate: "0.63",
              price: "78.40",
              up: false,
              consumeNum: "0.5",
              pic: Bear,
            },
            {
              no: "4938",
              title: "和碩",
              consumerate: "0.46",
              price: "67.70",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "2338",
              title: "光罩",
              consumerate: "0.1",
              price: "77.00",
              up: true,
              consumeNum: "0.13",
              pic: Bull,
            },
            {
              no: "2353",
              title: "宏碁",
              consumerate: "0.6",
              price: "67.70",
              up: true,
              consumeNum: "0.15",
              pic: Bull,
            },
            {
              no: "8046",
              title: "南電",
              consumerate: "1.5",
              price: "67.70",
              up: false,
              consumeNum: "0.36",
              pic: Bear,
            },
            {
              no: "3034",
              title: "聯詠",
              consumerate: "3.5",
              price: "387",
              up: true,
              consumeNum: "0.9",
              pic: Bull,
            },
            {
              no: "2474",
              title: "可成",
              consumerate: "0.5",
              price: "161",
              up: true,
              consumeNum: "0.31",
              pic: Bull,
            },
            {
              no: "2354",
              title: "鴻準",
              consumerate: "2.1",
              price: "68.70",
              up: false,
              consumeNum: "2.97",
              pic: Bear,
            },
            {
              no: "3231",
              title: "緯創",
              consumerate: "0.35",
              price: "28.35",
              up: false,
              consumeNum: "1.22$",
              pic: Bear,
            },
            {
              no: "2327",
              title: "國巨",
              consumerate: "6.5",
              price: "410.50",
              up: false,
              consumeNum: "1.56",
              pic: Bear,
            },
            {
              no: "4938",
              title: "和碩",
              consumerate: "0.46",
              price: "67.70",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "3003",
              title: "健和興",
              consumerate: "0.6",
              price: "88.8",
              up: true,
              consumeNum: "0.68",
              pic: Bull,
            },
            {
              no: "1533",
              title: "車王電",
              consumerate: "4.2",
              price: "46.65",
              up: true,
              consumeNum: "9.89",
              pic: Bull,
            },
            {
              no: "2308",
              title: "台達電",
              consumerate: "9.5",
              price: "249.5",
              up: true,
              consumeNum: "3.96",
              pic: Bull,
            },
            {
              no: "2301",
              title: "光寶科",
              consumerate: "0.1",
              price: "64.8",
              up: false,
              consumeNum: "0.15",
              pic: Bear,
            },
            {
              no: "1586",
              title: "和勤",
              consumerate: "0.05",
              price: "39.9",
              up: true,
              consumeNum: "0.13",
              pic: Bull,
            },
            {
              no: "3380",
              title: "明泰",
              consumerate: "0.1",
              price: "25.5",
              up: false,
              consumeNum: "0.39",
              pic: Bear,
            },
            {
              no: "6285",
              title: "啟基",
              consumerate: "0.9",
              price: "70.0",
              up: false,
              consumeNum: "1.27",
              pic: Bear,
            },
          ]}
        />
        <Swiper7
          list={[
            {
              no: "0056",
              title: "元大高股息",
              consumerate: "0.42",
              up: false,
              price: "95",
              consumeNum: "0.4",
              pic: Bear,
            },
            {
              no: "0050",
              title: "元大台灣50",
              consumerate: "0.34",
              price: "588",
              up: true,
              consumeNum: "0.4",
              pic: Bull,
            },
            {
              no: "2603",
              title: "長榮",
              consumerate: "0.40",
              price: "93.30",
              up: false,
              consumeNum: "0.2",
              pic: Bear,
            },
            {
              no: "2886",
              title: "兆豐金",
              consumerate: "4.97",
              price: "857",
              up: true,
              consumeNum: "18.5",
              pic: Bull,
            },
            {
              no: "2882",
              title: "國泰金",
              consumerate: "4.23",
              price: "59.10",
              up: true,
              consumeNum: "2.40",
              pic: Bull,
            },
            {
              no: "2883",
              title: "開發金",
              consumerate: "0.63",
              price: "78.40",
              up: false,
              consumeNum: "0.5",
              pic: Bear,
            },
            {
              no: "2889",
              title: "國票金",
              consumerate: "0.46",
              price: "67.70",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "2888",
              title: "新光金",
              consumerate: "0.24",
              price: "9.81",
              up: true,
              consumeNum: "2.51",
              pic: Bull,
            },
            {
              no: "2891",
              title: "中信金",
              consumerate: "0.05",
              price: "23.05",
              up: true,
              consumeNum: "0.22",
              pic: Bull,
            },
            {
              no: "2881",
              title: "富邦金",
              consumerate: "--",
              price: "75.10",
              up: true,
              consumeNum: "--",
              pic: Bull,
            },
            {
              no: "5880",
              title: "合庫金",
              consumerate: "0.15",
              price: "22.4",
              up: true,
              consumeNum: "0.67",
              pic: Bull,
            },
            {
              no: "2885",
              title: "元大金",
              consumerate: "0.25",
              price: "24.95",
              up: true,
              consumeNum: "1.01",
              pic: Bull,
            },
            {
              no: "2524",
              title: "京城",
              consumerate: "0.15",
              price: "67.70",
              up: true,
              consumeNum: "0.4",
              pic: Bull,
            },
            {
              no: "2801",
              title: "彰銀",
              consumerate: "0.05",
              price: "16.55",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "2812",
              title: "台中銀",
              consumerate: "0.05",
              price: "11.70",
              up: true,
              consumeNum: "0.43",
              pic: Bull,
            },
            {
              no: "2823",
              title: "中壽",
              consumerate: "0.3",
              price: "29.9",
              up: true,
              consumeNum: "1.01",
              pic: Bull,
            },
            {
              no: "2836",
              title: "高雄銀",
              consumerate: "0.05",
              price: "11.15",
              up: true,
              consumeNum: "0.45",
              pic: Bull,
            },
            {
              no: "2889",
              title: "台企銀",
              consumerate: "--",
              price: "9.5",
              up: true,
              consumeNum: "--",
              pic: Bull,
            },
            {
              no: "2889",
              title: "華南金",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
          ]}
        />
        <Swiper8
          list={[
            {
              no: "1102",
              title: "亞泥",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "1476",
              title: "儒鴻",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "2207",
              title: "和泰車",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "2912",
              title: "統一超",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "5904",
              title: "寶雅",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "8044",
              title: "網家",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "9921",
              title: "巨大",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "6582",
              title: "申豐",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "8454",
              title: "富邦媒",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "8464",
              title: "億豐",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "8086",
              title: "宏捷科",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
          ]}
        />
        <Swiper9
          list={[
            {
              no: "5211",
              title: "蒙恬",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "5210",
              title: "寶碩",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "6590",
              title: "普鴻",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "8284",
              title: "三竹",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "8086",
              title: "宏捷科",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "6751",
              title: "智聯服務",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "5209",
              title: "新鼎",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "5310",
              title: "天剛",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
            {
              no: "6140",
              title: "訊達",
              consumerate: "0.46",
              price: "20.30",
              up: true,
              consumeNum: "0.3",
              pic: Bull,
            },
          ]}
        />
*/
