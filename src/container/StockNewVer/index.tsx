import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Quote } from "model/Quote";
import QuoteInfo from "component/QuoteInfo";
import { useApexStateContext } from "context/Apex";
import { bufferTime, filter, map } from "rxjs/operators";
import { TickSubject } from "websocket/quote";
import { KLineSubject } from "websocket/quote/subject";
import { debounceTime } from "rxjs/operators";

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";
import api from "api";

const K_LINE_DEBOUNCE_DURATION = 300; //480000
const cx = classNames.bind(styles);
interface StockInfoType {
  quote: Quote;
}

const Stock = React.forwardRef<HTMLLIElement, StockInfoType>(
  ({ quote }, ref) => {
    let { NameSlave, UpDown, UpDownRate, BidPrice } = quote;
    const [quoteInfo, setQuoteInfo] = React.useState({
      bidPrice: BidPrice,
      upDown: UpDown,
      upDownRate: UpDownRate,
    });
    const { masterSessionId } = useApexStateContext();
    const [stockName] = NameSlave ? NameSlave.split(".") : [""];
    console.log(stockName, "執行Stock");
    const priceDecimal = quote.PriceDec || 0;
    const [priceData, setPriceData] = React.useState<number[]>([
      quote.PrePrice || 0,
    ]); //裝收盤價的array
    const delimiter = Math.pow(10, priceDecimal);
    const color =
      !quoteInfo.upDown || quoteInfo.upDown === 0
        ? "#c0c0c0"
        : quoteInfo.upDown > 0
        ? "#ff3d33"
        : "#43ff81";

    useEffect(() => {
      (async function () {
        const ticks = await api.getKLines({
          sessionId: masterSessionId,
          symbol: quote.Symbol,
          priceDecimal,
        });
        let ticksData = ticks
          .filter((tick, index) => {
            return index % 8 === 0; //八分鐘取一根
          })
          .map((tick) => tick.price);
        setPriceData((prev) => [...prev, ...ticksData]);
      })();
    }, [masterSessionId, priceDecimal, quote.Symbol]);

    //收Kline，更新線圖pipe(
    //  debounceTime(K_LINE_DEBOUNCE_DURATION)
    //)
    useEffect(() => {
      const subscriber = KLineSubject.subscribe((newKLine) => {
        if (newKLine.symbol !== quote.Symbol) {
          return;
        }
        let price = parseFloat(newKLine.price) / delimiter;
        setPriceData((prev) => [...prev, price]);
      });
      return () => {
        subscriber.unsubscribe();
      };
    }, [priceDecimal]);
    //收Tick，更新QuoteInfo
    React.useEffect(() => {
      //改成state
      const subscriber = TickSubject.pipe(
        filter((message) => message.symbol === quote.Symbol)
      ).subscribe((message) => {
        if (message.symbol !== quote.Symbol) {
          return;
        }
        setQuoteInfo({
          bidPrice: message.price / delimiter,
          upDown: message.upDown / delimiter,
          upDownRate: message.upDownRate / 100,
        });
      });

      return () => {
        subscriber.unsubscribe();
      };
    }, [setQuoteInfo]);

    return (
      <li className={cx("stock-item")} ref={ref}>
        <div className={cx("stock-item-wrap")}>
          <div className={cx("stock-title-box")}>{stockName}</div>
          <QuoteInfo
            price={quoteInfo.bidPrice}
            upDown={quoteInfo.upDown}
            upDownRate={quoteInfo.upDownRate}
            fractionDigits={2}
            denominator={1}
            className=""
          />
          <div className={cx("pic-box")}>
            <Sparklines
              data={priceData}
              limit={40}
              width={100}
              height={70}
              margin={5}
            >
              <SparklinesLine color={color} style={{ fillOpacity: 0.3 }} />
              <SparklinesReferenceLine
                type="custom"
                value={65}
                style={{ stroke: "#c0c0c0" }}
              />
            </Sparklines>
          </div>
        </div>
      </li>
    );
  }
);

export default React.memo(Stock);
