import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import styled, { keyframes } from "styled-components";
import QuoteInfo from "component/QuoteInfo";

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

interface stockListType {
  list: stockInfoType[];
}

const Swiper9: React.FC<stockListType> = ({ list }) => {
  const [boxwidth, setBoxWidth] = React.useState<number | null>(null);
  // const marquee = keyframes`
  //   0%{
  //     left:1280px
  //   }
  //   100%{
  //     left:${boxwidth ? "-" + boxwidth + "px" : "-100%"}
  //   }
  // `;animation: 30s ${marquee} linear infinite;

  const MarqueeUl = styled.ul`
    position: absolute;
    padding: 0;
    margin: 0;
    width: ${boxwidth ? boxwidth + "px" : "100%"};
  `;

  let stockItems = document.getElementsByClassName(cx("stock-item"));

  React.useEffect(() => {
    let totalLen = 0;

    for (let i = 0; i < stockItems.length; ++i) {
      totalLen += (stockItems.item(i)?.clientWidth || 0) + 60;
    }
    setBoxWidth(totalLen);
  }, []);

  return (
    <div className={cx("stocks-container")}>
      <MarqueeUl>
        {list.map((item, i) => {
          return (
            <li
              className={cx("stock-item")}
              style={{ opacity: boxwidth ? "1" : "0" }}
            >
              <div className={cx("stock-item-wrap")}>
                <div className={cx("stock-title-box")}>
                  <div className={cx("stock-no")}>{item.no}</div>
                  <div className={cx("stock-title")}>{item.title}</div>
                </div>
                <div className={cx("stock-data")}>
                  <QuoteInfo
                    price={+item.price}
                    upDown={+item.consumeNum}
                    upDownRate={0.13}
                    fractionDigits={0}
                    denominator={1}
                    className=""
                  />
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
            </li>
          );
        })}
      </MarqueeUl>
    </div>
  );
};

export default Swiper9;
