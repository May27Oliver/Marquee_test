import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import styled, { keyframes } from "styled-components";
import { useApexStateContext } from "context/Apex";
import MultiQuotes from "container/MultiQuotes";
import Stock from "container/Stock";
import LoadingOverlay from "component/LoadingOverlay";
import useMultiQuotes, { UseMultiQuotesParams } from "hooks/useMultiQuotes";
import api from "api";

const cx = classNames.bind(styles);

interface stockListType {
  symbols: string[];
}

//取得
const Marquee = (boxwidth: number) => keyframes`
  0%{
    left:3840px
  }
  100%{
    left:${boxwidth ? "-" + boxwidth + "px" : "-100%"}
  }
`;
interface MarqueeUIType {
  boxwidth: number;
}
const MarqueeUl = styled.ul`
  position: absolute;
  padding: 0;
  margin: 0;
  width: ${(props) => props.boxwidth + "px"};
  animation: 30s ${(props: MarqueeUIType) => Marquee(props.boxwidth)} linear
    infinite;
`;

const CSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const [boxwidth, setBoxWidth] = React.useState<number | null>(null);
  const stockRefs = React.useRef<React.RefObject<HTMLLIElement>[]>(
    symbols.map((_, i) => {
      return createRef();
    })
  );
  const { masterSessionId, slaveSessionId } = useApexStateContext();
  const {
    loading,
    value: quotes,
    error,
  } = useMultiQuotes({
    symbols,
    sessionId: masterSessionId,
  });

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
    if (!quotes) {
      return;
    }
    window.requestAnimationFrame(() => {
      setBoxWidth(
        stockRefs.current.reduce((acc, item) => {
          if (item.current) {
            return acc + item?.current?.offsetWidth || 0;
          }
          return acc;
        }, stockRefs.current[0]?.current?.offsetWidth || 0)
      );
    });
  }, [quotes]);

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
      <div className={cx("stocks-container")}>
        <MarqueeUl boxwidth={boxwidth || 700 * symbols.length}>
          {quotes.map((quote, index) => (
            <Stock
              key={quote.NameSlave}
              quote={quote}
              ref={stockRefs.current[index]}
            />
          ))}
        </MarqueeUl>
      </div>
    </>
  );
};

export default CSpeedTrain;
