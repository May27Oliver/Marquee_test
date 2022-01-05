import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

const cx = classNames.bind(styles);
interface StockInfoType {
  idx: number;
  children: React.ReactElement<any, any>;
}

const Stock = React.forwardRef<HTMLLIElement, StockInfoType>(
  ({ children, idx }, ref) => {
    return (
      <li className={cx("stock-item", `${idx}`)} ref={ref}>
        {children}
      </li>
    );
  }
);
interface UnvisibleStockType {
  symbol: string;
}

export const UnvisibleStock: React.FC<UnvisibleStockType> = ({ symbol }) => {
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
