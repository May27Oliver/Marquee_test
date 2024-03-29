import React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import AnimeCSpeedTrain from "container/AnimeCSpeedTrain";
import CanvasTrain from "container/CanvasTrain";
import Login from "container/Login";
import { useHistory } from "react-router-dom";
import SockJs from "sockjs-client";
import SettingPage from "container/Setting";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { LoginProvider } from "context/loginContext";
import {
  ApexProvider,
  useApexDispatchContext,
  useApexContext,
} from "context/Apex";
import { MarqueeProvider } from "context/MarqueeConfig";

import {
  connectQuoteWebSocket,
  SessionIdSubject as QuoteSessionIdSubject,
} from "websocket/quote";
import { getEnv } from "tools/getEnv";
import api from "api";

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
// function useConnectMasterQuoteSocket() {
//   const [{ masterSocket: quoteSocket }, apexInfoDispatch] = useApexContext();
//   React.useEffect(() => {
//     if (quoteSocket !== null) {
//       return;
//     }
//     const socket = connectQuoteWebSocket({
//       url: `${getEnv("QUOTE_MASTER_URL")}${getEnv(
//         "QUOTE_MASTER_SOCKET_END_POINT"
//       )}`,
//       onClose: () => {
//         apexInfoDispatch({ type: "CLOSE_MASTER_SOCKET" });
//       },
//     });
//     apexInfoDispatch({ type: "SET_MASTER_SOCKET", payload: socket });

//     return () => {
//       if (socket?.readyState === SockJs.OPEN) {
//         socket.send("disconnect");
//         apexInfoDispatch({ type: "CLOSE_MASTER_SOCKET" });
//       }
//     };
//   }, [quoteSocket, apexInfoDispatch]);
// }

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
  // useConnectMasterQuoteSocket();
  useConnectSlaveQuoteSocket();

  return (
    <div className="App">
      <RouteApp />
    </div>
  );
};

const RouteApp: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/marquee" component={AnimeStation} />
      <Route path="/setting" component={SettingPage} />
      <Route path="/login" component={Login} />
      <Redirect to="/marquee" />
      <Route path="/" exact>
        <Redirect to="/marquee" />
      </Route>
    </Switch>
  );
};

const AppProvider: React.FC = ({ children }) => {
  return (
    <ApexProvider>
      <MarqueeProvider>
        <LoginProvider>
          <HashRouter>{children}</HashRouter>
        </LoginProvider>
      </MarqueeProvider>
    </ApexProvider>
  );
};

const AnimeStation: React.FC = () => {
  const [symbols, setSymbols] = React.useState<string[]>([]);
  const [speed, setSpeed] = React.useState<number | null>(null);
  const [direction, setDirection] = React.useState<number | null>(null);
  React.useEffect(() => {
    (async () => {
      const [symbolRes, speedRes, dirRes] = await Promise.all([
        api.getMarqueeSymbols(),
        api.querySpeed(),
        api.getDirection(),
      ]);

      if (
        !symbolRes.result ||
        !speedRes.result ||
        !speedRes.speed ||
        !dirRes.result ||
        !dirRes.direction
      ) {
        return;
      }

      setSymbols(symbolRes.data);
      setSpeed(speedRes.speed);
      setDirection(dirRes.direction);
    })();
  }, []);
  if (!symbols || symbols.length === 0 || !speed || !direction) {
    return <div className="no-data-info">所設定要播放群組尚未匯入資料</div>;
  }
  return (
    <AnimeCSpeedTrain symbols={symbols} speed={speed} direction={direction} />
  );
};

export default hot(() => (
  <AppProvider>
    <App />
  </AppProvider>
));
