import React, { useEffect } from "react";
import classNames from "classnames/bind";
import SingleQuote from "container/SingleQuote";
import styles from "./index.module.css";
import { Quote } from "model/Quote";
import QuoteInfo from "component/QuoteInfo";
import { useApexStateContext } from "context/Apex";
import { KLineSubject } from "websocket/quote/subject";
import { debounceTime } from "rxjs/operators";

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";
import api from "api";

const K_LINE_DEBOUNCE_DURATION = 10;
const cx = classNames.bind(styles);

// interface stock {
//   symbol: string;
//   classname?: string;
// }

// const Stock = React.forwardRef<HTMLLIElement, stock>(({ symbol }, ref) => {
//   return (
//     <SingleQuote symbol={symbol}>
//       {(quote) => {
//         return <StockInfo quote={quote} ref={ref} />;
//       }}
//     </SingleQuote>
//   );
// });

interface StockInfoType {
  quote: Quote;
}

const Stock = React.forwardRef<HTMLLIElement, StockInfoType>(
  ({ quote }, ref) => {
    const { NameSlave, UpDown, UpDownRate, BidPrice } = quote;
    const { masterSessionId } = useApexStateContext();
    const [stockName] = NameSlave ? NameSlave.split(".") : [""];
    const priceDecimal = quote.PriceDec || 0;
    const [priceData, setPriceData] = React.useState<number[]>([
      quote.PrePrice || 0,
    ]); //裝收盤價的array

    const color =
      !UpDown || UpDown === 0 ? "#c0c0c0" : UpDown > 0 ? "#ff3d33" : "#43ff81";
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

    useEffect(() => {
      const delimiter = Math.pow(10, priceDecimal);
      const subscriber = KLineSubject.pipe(
        debounceTime(K_LINE_DEBOUNCE_DURATION)
      ).subscribe((newKLine) => {
        let price = parseFloat(newKLine.price) / delimiter;
        setPriceData((prev) => [...prev, price]);
      });
      return () => {
        subscriber.unsubscribe();
      };
    }, [priceDecimal]);

    return (
      <li className={cx("stock-item")} ref={ref}>
        <div className={cx("stock-item-wrap")}>
          <div className={cx("stock-title-box")}>{stockName}</div>
          <div className={cx("stock-data")}>
            <QuoteInfo
              price={BidPrice}
              upDown={UpDown}
              upDownRate={UpDownRate}
              fractionDigits={2}
              denominator={1}
              className=""
            />
          </div>
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
