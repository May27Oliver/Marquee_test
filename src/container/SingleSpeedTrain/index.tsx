import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import styled, { keyframes, StyledComponent } from "styled-components";
import { useApexStateContext } from "context/Apex";
import Stock from "container/StockNewVer";
import LoadingOverlay from "component/LoadingOverlay";
import useMultiQuotes from "hooks/useMultiQuotes";
import api from "api";

const cx = classNames.bind(styles);

interface stockListType {
  symbols: string[];
}

//取得
const MarqueeAnime = keyframes`
  0%{
    transform:translate(3840px,0)
  }
  25%{
    transform:translate(-674px,0)
  }
  25.1%{
    transform:translate(-674px,128px)
  }
  50%{
    transform:translate(3840px,128px)
  }
  50.1%{
    transform:translate(3840px,256px)
  }
  75%{
    transform:translate(-674px,256px)
  }
  75.1%{
    transform:translate(-674px,384px)
  }
  100%{
    transform:translate(3840px,384px)
  }
`;
const Marquee = styled.div`
  position: absolute;
  padding: 0;
  margin: 0;
  width: 3840px;
`;
//animation: 60s ${MarqueeAnime} linear infinite;

const SingleSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const stockRef = React.useRef<HTMLDivElement>(null);
  //觀察者模式intersectionObserver
  React.useEffect(() => {
    if (!stockRef.current) return;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new globalThis.IntersectionObserver((entry) => {
      const [{ target }] = entry;
      console.log("stockRefs entry", target);
    }, options);

    observer.observe(stockRef.current);
    return () => observer.disconnect();
  }, []);

  console.log("執行SingleSpeedTrainRender");
  return (
    <>
      <div className={cx("stocks-container")}>
        <div className={cx("stock-ship")} ref={stockRef}>
          <StockTrain symbols={symbols} />
        </div>
      </div>
    </>
  );
};

const StockTrain: React.FC<stockListType> = ({ symbols }) => {
  const { masterSessionId, slaveSessionId } = useApexStateContext();
  //取得所有quotes
  const {
    loading,
    value: quotes,
    error,
  } = useMultiQuotes({
    symbols,
    sessionId: masterSessionId,
  });

  React.useEffect(() => {
    api.registerTick({
      symbols: symbols,
      types: ["KLine", "Tick"],
      masterSessionId,
      slaveSessionId,
    });
  }, [masterSessionId, slaveSessionId, symbols]);

  if (error || !quotes) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        發生錯誤: {error?.message}
      </div>
    );
  }

  return (
    <>
      {loading && <LoadingOverlay isOpen />}
      {symbols.map((symbol, index) => (
        <Stock key={quotes[symbol].NameSlave} quote={quotes[symbol]} />
      ))}
    </>
  );
};

export default SingleSpeedTrain;
