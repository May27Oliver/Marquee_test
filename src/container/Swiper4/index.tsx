import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useHistory } from "react-router";
import Bear from "assets/image/bear.png";
import Bull from "assets/image/bull.png";

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

const Swiper4: React.FC = (props) => {
  const stockItemRef = React.useRef<HTMLDivElement | null>(null);
  const [boxwidth, setBoxWidth] = React.useState<string>("100%");
  const stocks: stockInfoType[] = [
    {
      no: "2481",
      title: "強茂",
      consumerate: "0.42",
      up: false,
      price: "95",
      consumeNum: "0.4",
      pic: Bear,
    },
    {
      no: "2330",
      title: "台積電",
      consumerate: "0.34",
      price: "588",
      up: true,
      consumeNum: "0.4",
      pic: Bull,
    },
    {
      no: "2317",
      title: "鴻海",
      consumerate: "0.40",
      price: "109.5",
      up: true,
      consumeNum: "0.2",
      pic: Bull,
    },
    {
      no: "2454",
      title: "聯發科",
      consumerate: "4.97",
      price: "857",
      up: true,
      consumeNum: "18.5",
      pic: Bull,
    },
    {
      no: "2303",
      title: "聯電",
      consumerate: "4.23",
      price: "59.10",
      up: true,
      consumeNum: "2.40",
      pic: Bull,
    },
    {
      no: "2303",
      title: "廣達",
      consumerate: "0.63",
      price: "78.40",
      up: false,
      consumeNum: "0.5",
      pic: Bear,
    },
    {
      no: "4938",
      title: "和碩",
      consumerate: "0.46",
      price: "67.70",
      up: true,
      consumeNum: "0.3",
      pic: Bull,
    },
  ];
  React.useEffect(() => {
    let stockItems = document.getElementsByClassName(cx("stock-item"));
    // console.log(stockItems.map(item=>item.style.width));
    let totalLen = 0;
    for (let i = 0; i < stockItems.length; ++i) {
      totalLen += (stockItems.item(i)?.getBoundingClientRect().width || 0) + 50;
      console.log(stockItems.item(i)?.getBoundingClientRect().width);
    }
    console.log(totalLen);
    setBoxWidth(totalLen + "px");
  }, []);
  return (
    <div className={cx("stocks-container")}>
      <div className={cx("stock-box")} style={{ width: boxwidth }}>
        {stocks.map((item, i) => {
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
      </div>
    </div>
  );
};

export default Swiper4;
