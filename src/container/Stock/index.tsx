import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Quote } from "model/Quote";
import { RegType } from "container/AnimeCSpeedTrain";
import VisiableStock from "container/VisibleStock";

const cx = classNames.bind(styles);
interface StockInfoType {
  symbol: string;
  quote: Quote | undefined;
  AppRef: Element | null;
  firstTimeStamp: number;
  timeGap: number;
  regMap: RegType;
}

const Stock = React.forwardRef<HTMLLIElement, StockInfoType>(
  ({ quote, symbol, firstTimeStamp, timeGap, AppRef, regMap }, ref) => {
    return (
      <li className={cx("stock-item")} ref={ref}>
        {quote ? (
          <VisiableStock
            AppRef={AppRef}
            symbol={symbol}
            quote={quote}
            key={quote.NameSlave}
            firstTimeStamp={firstTimeStamp}
            timeGap={timeGap}
          />
        ) : (
          <UnvisibleStock symbol={symbol} />
        )}
      </li>
    );
  }
);
interface UnvisibleStockType {
  symbol: string;
  className?: string;
}

export const UnvisibleStock: React.FC<UnvisibleStockType> = ({
  className,
  symbol,
}) => {
  return (
    <>
      <div className={cx("stock-item-wrap")}>
        <div className={cx("stock-title-box")}>{symbol}</div>
        <div
          className={cx("QuoteInfo-container")}
          style={{ flex: "0 0 300px" }}
        ></div>
        <div className={cx("pic-box")}></div>
      </div>
    </>
  );
};

export default Stock;
