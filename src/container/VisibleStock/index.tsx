import React, { useEffect, useImperativeHandle } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Quote } from "model/Quote";
import QuoteInfo from "component/QuoteInfo";
import { useApexStateContext } from "context/Apex";
import { Subscription } from "rxjs";
import { filter, throttleTime } from "rxjs/operators";
import { TickSubject } from "websocket/quote";
import { KLineSubject } from "websocket/quote/subject";
import { GetKLinType } from "container/AnimeCSpeedTrain";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";
import api from "api";

const cx = classNames.bind(styles);
interface StockInfoType {
  quote: Quote;
  symbol: string;
  firstTimeStamp: number;
  timeGap: number;
}

/* Multi*/
const VisiableStock = React.forwardRef<GetKLinType, StockInfoType>(
  ({ quote, firstTimeStamp, timeGap }, ref) => {
    const { NameSlave, UpDown, UpDownRate, BidPrice, PrePrice } = quote;

    const [quoteInfo, setQuoteInfo] = React.useState({
      bidPrice: BidPrice || 0,
      upDown: UpDown || 0,
      upDownRate: UpDownRate || 0,
    });
    const { slaveSessionId } = useApexStateContext();
    const [stockName] = NameSlave ? NameSlave.split(".") : [""];
    const priceDecimal = quote.PriceDec || 0;
    const [priceData, setPriceData] = React.useState<number[]>([PrePrice || 0]); //裝收盤價的array
    const delimiter = Math.pow(10, priceDecimal);
    const color =
      !quoteInfo.upDown || quoteInfo.upDown === 0
        ? "#c0c0c0"
        : quoteInfo.upDown > 0
        ? "#ff3d33"
        : "#43ff81";

    const tickSubRef = React.useRef<Subscription | null>(null);
    const klineSubRef = React.useRef<Subscription | null>(null);

    useImperativeHandle(ref, () => ({
      getKLineApi,
    }));

    const getKLineApi = async () => {
      const ticks = await api.getKLines({
        sessionId: slaveSessionId,
        symbol: quote.Symbol,
        priceDecimal,
      });
      let ticksData = ticks
        .filter((_, index) => {
          return index % 5 === 0; //五分鐘取一根
        })
        .map((tick) => tick.price);
      if (PrePrice) {
        setPriceData([PrePrice, ...ticksData]);
      } else {
        setPriceData([...ticksData]);
      }
    };

    useEffect(() => {
      getKLineApi();
      // eslint-disable-next-line
    }, [slaveSessionId, priceDecimal, quote]);

    useEffect(() => {
      //收KLine
      klineSubRef.current = KLineSubject.pipe(
        filter((message) => message.symbol === quote.Symbol),
        throttleTime(5000)
      ).subscribe((newKLine) => {
        if (newKLine.symbol !== quote.Symbol) {
          return;
        }
        //找出是哪個時間點的price需要更換
        const indexNeedChange = Math.floor(
          (newKLine.tickTime - firstTimeStamp) / timeGap
        );
        // 算出price
        let price = parseFloat(newKLine.price) / delimiter;
        setPriceData((prev) => {
          return prev.map((oldPrice, index) => {
            if (index === indexNeedChange) {
              return price;
            }
            return oldPrice;
          });
        });
      });

      //收Tick
      tickSubRef.current = TickSubject.pipe(
        filter((message) => message.symbol === quote.Symbol),
        throttleTime(5000) //5秒收一次
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
        klineSubRef.current?.unsubscribe();
        tickSubRef.current?.unsubscribe();
      };
      // eslint-disable-next-line
    }, []);

    return (
      <>
        <div className={cx("stock-item-wrap")}>
          <div
            className={cx(
              "stock-title-box",
              stockName.length < 4 ? "" : "oversize"
            )}
          >
            {stockName}
          </div>
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
              limit={50}
              width={100}
              height={50}
              margin={5}
            >
              {/*  style={{ fillOpacity: 0.3 }} */}
              <SparklinesLine color={color} />
              <SparklinesReferenceLine
                type="custom"
                value={65}
                style={{ stroke: "#c0c0c0" }}
              />
            </Sparklines>
          </div>
        </div>
      </>
    );
  }
);

export default React.memo(VisiableStock);
