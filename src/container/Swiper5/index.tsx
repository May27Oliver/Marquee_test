import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useHistory } from "react-router";
import Bear from "assets/image/bear.png";
import Bull from "assets/image/bull.png";
import styled, { keyframes } from "styled-components";

const cx = classNames.bind(styles);
interface stockInfoType {
  no: string;
  title: string;
  consumerate: string;
  price: string;
  up: boolean;
  consumeNum: string;
  pic: string;
}
interface swiperprops {
  list: stockInfoType[];
}

const Swiper5: React.FC<swiperprops> = ({ list }) => {
  const [boxwidth, setBoxWidth] = React.useState<string | number>("100%");
  const [boxwidthCp, setBoxWidthCp] = React.useState<string | number>("100%");

  const marquee = keyframes`
    0%{
      left:${boxwidth}px
    }
    100%{
      left:${"-" + boxwidth}px
    }
  `;
  const marquee2 = keyframes`
    0%{
      left:${+boxwidth + +boxwidth}px
    }
    100%{
      left:0
    }
  `;
  const MarqueeSpan = styled.span`
    animation: 30s ${marquee} linear infinite;
    width: ${boxwidth}px;
    text-align: start;
    position: absolute;
  `;
  const MarqueeSpan2 = styled.span`
    animation: 20s ${marquee2} linear infinite;
    width: ${boxwidthCp}px;
    text-align: start;
    position: absolute;
  `;

  React.useEffect(() => {
    let stockItems = document.getElementsByClassName(cx("stock-item"));
    // console.log(stockItems.map(item=>item.style.width));
    let totalLen = 0;
    for (let i = 0; i < stockItems.length; ++i) {
      totalLen += (stockItems.item(i)?.getBoundingClientRect().width || 0) + 50;
    }
    console.log(totalLen);
    setBoxWidth(totalLen);
    let stockItemsCp = document.getElementsByClassName(cx("stock-item-copy"));
    let totalLenCp = 0;
    for (let i = 0; i < stockItemsCp.length; ++i) {
      totalLenCp +=
        (stockItemsCp.item(i)?.getBoundingClientRect().width || 0) + 50;
      console.log(stockItemsCp.item(i)?.getBoundingClientRect().width);
    }
    setBoxWidthCp(totalLenCp);
  }, []);
  return (
    <div className={cx("stocks-container")}>
      <MarqueeSpan>
        {list.map((item, i) => {
          return (
            <div className={cx("stock-item")}>
              <div className={cx("stock-item-wrap")}>
                <div className={cx("stock-title-box")}>
                  <div className={cx("stock-no")}>{item.no}</div>
                  <div className={cx("stock-title")}>{item.title}</div>
                </div>
                <div className={cx("stock-data")}>
                  <div
                    className={cx(
                      "change-num",
                      item.up ? "red-words" : "green-words"
                    )}
                  >
                    {item.up
                      ? "+" + item.consumerate + "%"
                      : "-" + item.consumerate + "%"}
                  </div>
                  <div className={cx("price-and-num")}>
                    <div className={cx("stock-price")}>{item.price}</div>
                    <div className={cx("stock-consumeNum")}>
                      {item.consumeNum}
                    </div>
                  </div>
                </div>
                <div
                  className={cx("pic-box")}
                  style={{
                    background: ` url(${item.pic}) no-repeat`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </MarqueeSpan>
    </div>
  );
};

export default Swiper5;

{
  /* <MarqueeSpan2>
        {stocks.map((item, i) => {
          return (
            <div className={cx("stock-item-copy")}>
              <div className={cx("stock-item-wrap")}>
                <div className={cx("stock-title-box")}>
                  <div className={cx("stock-no")}>{item.no}</div>
                  <div className={cx("stock-title")}>{item.title}</div>
                </div>
                <div className={cx("stock-data")}>
                  <div
                    className={cx(
                      "change-num",
                      item.up ? "red-words" : "green-words"
                    )}
                  >
                    {item.up
                      ? "+" + item.consumerate + "%"
                      : "-" + item.consumerate + "%"}
                  </div>
                  <div className={cx("price-and-num")}>
                    <div className={cx("stock-price")}>{item.price}</div>
                    <div className={cx("stock-consumeNum")}>
                      {item.consumeNum}
                    </div>
                  </div>
                </div>
                <div
                  className={cx("pic-box")}
                  style={{
                    background: ` url(${item.pic}) no-repeat`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </MarqueeSpan2> */
}
