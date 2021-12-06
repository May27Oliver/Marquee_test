import React, { createRef, RefObject, useCallback } from "react";
import classNames from "classnames/bind";

import styled, { keyframes } from "styled-components";
import Stock from "container/Stock";
import { set } from "animejs";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

interface stockListType {
  symbols: string[];
}

const useStockRefs = (
  symbols: string[]
): [
  React.MutableRefObject<React.RefObject<HTMLLIElement>[]>,
  (node: HTMLLIElement) => void
] => {
  let mounted = false;
  const ref = React.useRef<React.RefObject<HTMLLIElement>[]>();
  // symbols.map((\_, i) => {
  // return setRef();
  // })
  const setRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (node) {
        mounted = true;
      } else if (node === null) {
        mounted = false;
      }
    },
    [mounted]
  );
  // return [ref, setRef];
  return [[] as any, setRef];
};

const CSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const [boxwidth, setBoxWidth] = React.useState<number | null>(null);
  // const stockRefs = React.useRef<React.RefObject<HTMLLIElement>[]>(
  const stockRefs = React.useRef<Array<React.MutableRefObject<HTMLElement>>>(
    Array.from({ length: symbols.length })
    // symbols.map((\_, i) => {
    // return createRef();
    // })
  );
  const marquee = keyframes` 0%{ left:1280px } 100%{ left:${
    boxwidth ? "-" + boxwidth + "px" : "-100%"
  } } `;

  const MarqueeUl = styled.ul`
    position: absolute;
    padding: 0;
    margin: 0;
    width: ${boxwidth ? boxwidth + "px" : "100%"};
    animation: 30s ${marquee} linear infinite;
  `;
  //Q:要得知確切 ref.current 得到 dom 的時間點
  React.useEffect(() => {
    console.log("stockRefs 40", stockRefs);
    console.log("1");
    setBoxWidth(
      stockRefs.current.reduce((acc, item) => {
        if (item.current) {
          return acc + item?.current?.offsetWidth || 0;
        }
        return acc;
      }, stockRefs.current[0]?.current?.offsetWidth || 0)
    );
  }, []);

  return (
    <div className={cx("stocks-container")}>
      <MarqueeUl>
        {symbols.map((symbol, index) => (
          <Stock
            symbol={symbol}
            classname={cx("stock-item")}
            ref={stockRefs.current[index]}
          />
        ))}
      </MarqueeUl>
    </div>
  );
};

export default CSpeedTrain;

// const CSpeedTrain1: React.FC<stockListType> = ({ symbols }) => {
// const [boxwidth, setBoxWidth] = React.useState<number | null>(null);
// // const stockRefs = React.useRef<React.RefObject<HTMLLIElement>[]>(
// const stockRefs = React.useRef<Map<string, HTMLElement>>(new Map());
// const marquee = keyframes`// 0%{ // left:1280px // } // 100%{ // left:${boxwidth ? "-" + boxwidth + "px" : "-100%"} // } // `;

// const MarqueeUl = styled.ul`// position: absolute; // padding: 0; // margin: 0; // width: ${boxwidth ? boxwidth + "px" : "100%"}; // animation: 30s ${marquee} linear infinite; // `;
// //Q:要得知確切 ref.current 得到 dom 的時間點
// React.useEffect(() => {
// console.log("stockRefs 40", stockRefs);
// console.log("1");
// setBoxWidth(
// Array.from(stockRefs.current.values()).reduce(acc, item) => {
// if (item) {
// return acc + item?.current?.offsetWidth || 0;
// }
// return acc;
// }, stockRefs.current[0]?.current?.offsetWidth || 0)
// );
// }, []);

// return (
// <div className={cx("stocks-container")}>
// <MarqueeUl>
// {symbols.map((symbol, index) => (
// <Stock
// symbol={symbol}
// classname={cx("stock-item")}
// ref={(el) => (stockRefs.current[symbol] = el)}
// />
// ))}
// </MarqueeUl>
// </div>
// );
// };
