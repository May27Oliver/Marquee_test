import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import styled, { keyframes } from "styled-components";
import { useApexStateContext } from "context/Apex";
import Stock from "container/Stock";
import LoadingOverlay from "component/LoadingOverlay";
import useMultiQuotes from "hooks/useMultiQuotes";
import api from "api";

const cx = classNames.bind(styles);

const FIRSTTIMESTAMP = new Date().setHours(9, 0, 0, 0);
const LASTTIMESTAMP = new Date().setHours(13, 30, 0, 0);
const PRICELENGTH = 50;
const TIMEGP = (LASTTIMESTAMP - FIRSTTIMESTAMP) / PRICELENGTH;
interface stockListType {
  symbols: string[];
}

interface MarqueeUIType {
  boxwidth: number;
}
const MarqueeUl = styled.ul`
  position: absolute;
  padding: 0;
  margin: 0;
  width: ${(props: MarqueeUIType) => props.boxwidth + "px"};
`;
// animation: 60s ${(props: MarqueeUIType) => Marquee(props.boxwidth)} linear
//   infinite;

const CSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const [boxwidth, setBoxWidth] = React.useState<number | null>(null);
  const stockRefs = React.useRef<React.RefObject<HTMLLIElement>[]>(
    symbols.map((_, i) => {
      return createRef();
    })
  );
  //觀察者模式intersectionObserver
  // useEffect(() => {
  //   if (!stockRefs.current[0].current) return;
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1.0,
  //   };
  //   const observer = new globalThis.IntersectionObserver((entry) => {
  //     const [{ target }] = entry;
  //     console.log("stockRefs entry", target);
  //   }, options);

  //   observer.observe(stockRefs.current[0].current);
  //   return () => observer.disconnect();
  // }, []);

  //取得所有quote資訊後設定ul外寬
  React.useEffect(() => {
    console.log("stockRefs.current", stockRefs.current);
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        setBoxWidth(
          stockRefs.current.reduce((acc, item) => {
            if (item.current) {
              return acc + item?.current?.offsetWidth || 0;
            }
            return acc;
          }, stockRefs.current[0]?.current?.offsetWidth || 0)
        );
      }, 500);
    });
  }, []);

  return (
    <>
      <div className={cx("stocks-container")}>
        <MarqueeUl boxwidth={750 * symbols.length}>
          <StockTrain symbols={symbols} stockRefs={stockRefs} />
        </MarqueeUl>
      </div>
    </>
  );
};

interface StockTrainType extends stockListType {
  stockRefs: React.MutableRefObject<React.RefObject<HTMLLIElement>[]>;
}

const StockTrain: React.FC<StockTrainType> = ({ symbols, stockRefs }) => {
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
        <Stock
          key={quotes[symbol].NameSlave}
          quote={quotes[symbol]}
          firstTimeStamp={FIRSTTIMESTAMP}
          timeGap={TIMEGP}
          ref={stockRefs.current[index]}
        />
      ))}
    </>
  );
};

export default CSpeedTrain;
