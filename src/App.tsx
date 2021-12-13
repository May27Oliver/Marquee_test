import React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import AnimeSpeedTrain from "container/AnimeCSpeedTrain";
import CanvasTrain from "container/CanvasTrain";
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
      <AnimeSpeedTrain
        symbols={[
          "2330.TW",
          "0050.TW",
          "2481.TW",
          "2382.TW",
          "4938.TW",
          "0056.TW",
          "1101.TW",
          "2002.TW",
          "2353.TW",
          "2880.TW",
          "2890.TW",
          "2317.TW",
          "3034.TW",
          "5210.TW",
          "2338.TW",
          "2615.TW",
          "2882.TW",
          "2881.TW",
          "2889.TW",
          "2301.TW",
          "2801.TW",
          "6183.TW",
          "2885.TW",
          "2887.TW",
          "6547.TW",
          "2753.TW",
          "3380.TW",
          "2327.TW",
          "1723.TW",
          "2344.TW",
          "2351.TW",
          "2337.TW",
          "3588.TW",
          "6239.TW",
          "8081.TW",
          "8271.TW",
          "3583.TW",
          "3530.TW",
          "2458.TW",
          "3057.TW",
          "3005.TW",
          "6128.TW",
          "6669.TW",
          "4916.TW",
          "6117.TW",
          "2364.TW",
          "2331.TW",
          "2365.TW",
          "3002.TW",
          "2376.TW",
          "3060.TW",
          "2439.TW",
          "3596.TW",
          "6442.TW",
          "6216.TW",
          "2412.TW",
          "8011.TW",
          "8101.TW",
          "3047.TW",
          "3045.TW",
          "6155.TW",
          "2313.TW",
          "3042.TW",
          "6133.TW",
          "6108.TW",
          "3376.TW",
          "2467.TW",
          "2367.TW",
          "2483.TW",
          "3653.TW",
          "6269.TW",
          "8039.TW",
          "3011.TW",
          "2415.TW",
          "6213.TW",
          "4999.TW",
          "2347.TW",
          "3702.TW",
          "3028.TW",
          "3033.TW",
          "6189.TW",
          "2430.TW",
          "3036.TW",
          "8072.TW",
          "3010.TW",
          "3209.TW",
          "8112.TW",
          "1201.TW",
          "1203.TW",
          "1216.TW",
          "1231.TW",
          "1233.TW",
          "1702.TW",
          "1737.TW",
          "1215.TW",
          "1217.TW",
          "1232.TW",
          "1227.TW",
          "2204.TW",
          "2201.TW",
          "3346.TW",
          "6605.TW",
          "1259.TW",
          "2247.TW",
          "1587.TW",
          "1512.TW",
          "1521.TW",
          "1533.TW",
          "1319.TW",
          "1599.TW",
          "2243.TW",
          "1603.TW",
          "1611.TW",
          "1617.TW",
          "1609.TW",
          "5283.TW",
        ]}
      />
      {/* <CanvasTrain
        symbols={[
          "2330.TW",
          "0050.TW",
          "2481.TW",
          "2382.TW",
          "4938.TW",
          "2201.TW",
          "1101.TW",
          "2002.TW",
          "2353.TW",
          "2880.TW",
          "2890.TW",
          "2317.TW",
          "3034.TW",
          "5210.TW",
          "2338.TW",
          "2615.TW",
          "2882.TW",
          "2881.TW",
          "2889.TW",
          "2327.TW",
          "2301.TW",
          "2801.TW",
          "6183.TW",
          "2885.TW",
        ]}
      /> */}
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
