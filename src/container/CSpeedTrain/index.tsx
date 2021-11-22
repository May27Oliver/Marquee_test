import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import styled, { keyframes } from "styled-components";
import Stock from "container/Stock";

const cx = classNames.bind(styles);

interface stockListType {
  symbols: string[];
}

const CSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const [boxwidth, setBoxWidth] = React.useState<number | null>(null);
  const marquee = keyframes`
    0%{
      left:1280px
    }
    100%{
      left:${boxwidth ? "-" + boxwidth + "px" : "-100%"}
    }
  `;

  const MarqueeUl = styled.ul`
    position: absolute;
    padding: 0;
    margin: 0;
    width: ${boxwidth ? boxwidth + "px" : "100%"};
    animation: 30s ${marquee} linear infinite;
  `;

  React.useEffect(() => {
    let stockItems = document.getElementsByClassName(cx("stock-item"));
    console.log("stockItems", stockItems);
    if (!stockItems) {
      return;
    }
    let totalLen = 0;

    for (let i = 0; i < stockItems.length; ++i) {
      totalLen += (stockItems.item(i)?.clientWidth || 0) + 60;
    }
    setBoxWidth(totalLen);
  }, []);

  return (
    <div className={cx("stocks-container")}>
      <MarqueeUl>
        {symbols.map((symbol) => (
          <Stock symbol={symbol} classname={cx("stock-item")} />
        ))}
      </MarqueeUl>
    </div>
  );
};

export default CSpeedTrain;
