import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Quote } from "model/Quote";
import getSingleQuote from "./getSingleQuote";
import QuoteInfo from "component/QuoteInfo";
import { useApexStateContext } from "context/Apex";
import { Subscription } from "rxjs";
import { filter, throttleTime } from "rxjs/operators";
import { TickSubject } from "websocket/quote";
import { KLineSubject } from "websocket/quote/subject";
import { RegType } from "container/AnimeCSpeedTrain";
import { UnvisibleStock } from "container/Stock";
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
  AppRef: Element | null;
  firstTimeStamp: number;
  timeGap: number;
  regMap: RegType;
}

/*Single*/
// const VisiableStock = React.forwardRef<HTMLLIElement, StockInfoType>(
//   ({ symbol, firstTimeStamp, timeGap, AppRef, regMap }, ref) => {
//     const [quote, setQuote] = React.useState<Quote | undefined>(undefined);
//     const [quoteInfo, setQuoteInfo] = React.useState({
//       bidPrice: 0,
//       upDown: 0,
//       upDownRate: 0,
//     });
//     const [stockName, setStockName] = React.useState<string>("");
//     const { masterSessionId } = useApexStateContext();
//     const [priceData, setPriceData] = React.useState<number[]>([]); //裝收盤價的array
//     const color =
//       !quoteInfo.upDown || quoteInfo.upDown === 0
//         ? "#c0c0c0"
//         : quoteInfo.upDown > 0
//         ? "#ff3d33"
//         : "#43ff81";

//     const tickSubRef = React.useRef<Subscription | null>(null);
//     const klineSubRef = React.useRef<Subscription | null>(null);
//     const stockRef = React.useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//       (async () => {
//         const quote = await getSingleQuote({
//           symbol,
//           sessionId: masterSessionId,
//         });
//         if (!quote) return;
//         const [stockName] = quote?.NameSlave
//           ? quote.NameSlave.split(".")
//           : [""];

//         const { NameSlave, UpDown, UpDownRate, BidPrice, PrePrice } = quote;
//         setQuote(() => quote);
//         setStockName(stockName);
//         setQuoteInfo({
//           bidPrice: BidPrice || 0,
//           upDown: UpDown || 0,
//           upDownRate: UpDownRate || 0,
//         });
//       })();
//     }, [masterSessionId]);

//     React.useEffect(() => {
//       if (!quote) return;
//       const priceDecimal = quote?.PriceDec || 0;
//       (async function () {
//         const ticks = await api.getKLines({
//           sessionId: masterSessionId,
//           symbol: quote.Symbol,
//           priceDecimal,
//         });
//         let ticksData = ticks
//           .filter((tick, index) => {
//             return index % 5 === 0; //五分鐘取一根
//           })
//           .map((tick) => tick.price);
//         setPriceData((prev) => [...prev, ...ticksData]);
//       })();
//     }, [masterSessionId, quote]);

//     //觀察者模式intersectionObserver
//     useEffect(() => {
//       if (!stockRef.current || !quote) return;
//       const options = {
//         root: AppRef,
//         rootMargin: "0px",
//         threshold: 1,
//       };
//       const observer = new globalThis.IntersectionObserver((entry) => {
//         const [{ target }] = entry;
//         const bounceData = target.getBoundingClientRect();
//         const top = bounceData.top;
//         const right = bounceData.right;
//         const priceDecimal = quote?.PriceDec || 0;
//         const delimiter = Math.pow(10, priceDecimal);

//         if (top > 500 && right < 700) {
//           console.log(stockName, "不可以色色");
//           regMap[quote.Symbol].reg = false;
//           klineSubRef.current?.unsubscribe();
//           tickSubRef.current?.unsubscribe();
//         } else if (top === 0 && right > 2000 && right < 4000) {
//           regMap[quote.Symbol].reg = true;
//           //收KLine
//           klineSubRef.current = KLineSubject.pipe(
//             filter((message) => message.symbol === quote.Symbol),
//             throttleTime(5000)
//           ).subscribe((newKLine) => {
//             if (newKLine.symbol !== quote.Symbol) {
//               return;
//             }
//             //找出是哪個時間點的price需要更換
//             const indexNeedChange = Math.floor(
//               (newKLine.tickTime - firstTimeStamp) / timeGap
//             );
//             // 算出price
//             let price = parseFloat(newKLine.price) / delimiter;
//             setPriceData((prev) => {
//               return prev.map((oldPrice, index) => {
//                 if (index === indexNeedChange) {
//                   return price;
//                 }
//                 return oldPrice;
//               });
//             });
//           });

//           //收Tick
//           tickSubRef.current = TickSubject.pipe(
//             filter((message) => message.symbol === quote.Symbol),
//             throttleTime(5000) //5秒收一次
//           ).subscribe((message) => {
//             if (message.symbol !== quote.Symbol) {
//               return;
//             }
//             setQuoteInfo({
//               bidPrice: message.price / delimiter,
//               upDown: message.upDown / delimiter,
//               upDownRate: message.upDownRate / 100,
//             });
//           });
//         } else {
//           return;
//         }

//         return () => {
//           klineSubRef.current?.unsubscribe();
//           tickSubRef.current?.unsubscribe();
//         };
//       }, options);

//       observer.observe(stockRef.current);
//       return () => observer.disconnect();
//     }, []);

//     if (!quote) {
//       return <UnvisibleStock ref={ref} />;
//     }
//     return (
//       <li className={cx("stock-item")} ref={ref}>
//         <div className={cx("stock-item-wrap")} ref={stockRef}>
//           <div
//             className={cx(
//               "stock-title-box",
//               stockName.length < 4 ? "" : "oversize"
//             )}
//           >
//             {stockName}
//           </div>
//           <QuoteInfo
//             price={quoteInfo.bidPrice}
//             upDown={quoteInfo.upDown}
//             upDownRate={quoteInfo.upDownRate}
//             fractionDigits={2}
//             denominator={1}
//             className=""
//           />
//           <div className={cx("pic-box")}>
//             <Sparklines
//               data={priceData}
//               limit={50}
//               width={100}
//               height={70}
//               margin={5}
//             >
//               <SparklinesLine color={color} style={{ fillOpacity: 0.3 }} />
//               <SparklinesReferenceLine
//                 type="custom"
//                 value={65}
//                 style={{ stroke: "#c0c0c0" }}
//               />
//             </Sparklines>
//           </div>
//         </div>
//       </li>
//     );
//   }
// );

/* Multi*/
const VisiableStock: React.FC<StockInfoType> = ({
  quote,
  firstTimeStamp,
  timeGap,
  AppRef,
  regMap,
}) => {
  const { NameSlave, UpDown, UpDownRate, BidPrice, PrePrice } = quote;

  const [quoteInfo, setQuoteInfo] = React.useState({
    bidPrice: BidPrice || 0,
    upDown: UpDown || 0,
    upDownRate: UpDownRate || 0,
  });
  const { masterSessionId } = useApexStateContext();
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
  const stockRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!quote) return;
    (async function () {
      const ticks = await api.getKLines({
        sessionId: masterSessionId,
        symbol: quote.Symbol,
        priceDecimal,
      });
      let ticksData = ticks
        .filter((tick, index) => {
          return index % 5 === 0; //五分鐘取一根
        })
        .map((tick) => tick.price);
      setPriceData((prev) => [...prev, ...ticksData]);
    })();

    // //收KLine
    // klineSubRef.current = KLineSubject.pipe(
    //   filter((message) => message.symbol === quote.Symbol),
    //   throttleTime(5000)
    // ).subscribe((newKLine) => {
    //   if (newKLine.symbol !== quote.Symbol) {
    //     return;
    //   }
    //   //找出是哪個時間點的price需要更換
    //   const indexNeedChange = Math.floor(
    //     (newKLine.tickTime - firstTimeStamp) / timeGap
    //   );
    //   // 算出price
    //   let price = parseFloat(newKLine.price) / delimiter;
    //   setPriceData((prev) => {
    //     return prev.map((oldPrice, index) => {
    //       if (index === indexNeedChange) {
    //         return price;
    //       }
    //       return oldPrice;
    //     });
    //   });
    // });

    // //收Tick
    // tickSubRef.current = TickSubject.pipe(
    //   filter((message) => message.symbol === quote.Symbol),
    //   throttleTime(5000) //5秒收一次
    // ).subscribe((message) => {
    //   if (message.symbol !== quote.Symbol) {
    //     return;
    //   }
    //   setQuoteInfo({
    //     bidPrice: message.price / delimiter,
    //     upDown: message.upDown / delimiter,
    //     upDownRate: message.upDownRate / 100,
    //   });
    // });

    // return () => {
    //   klineSubRef.current?.unsubscribe();
    //   tickSubRef.current?.unsubscribe();
    // };
  }, [masterSessionId, priceDecimal, quote]);

  //觀察者模式intersectionObserver
  useEffect(() => {
    if (!stockRef.current || !quote) return;
    const options = {
      root: AppRef,
      rootMargin: "0px",
      threshold: 1,
    };
    const observer = new globalThis.IntersectionObserver((entry) => {
      const [{ target }] = entry;
      const bounceData = target.getBoundingClientRect();
      const top = bounceData.top;
      const right = bounceData.right;

      if (top > 500 && right < 700) {
        console.log(stockName, "不可以色色");
        regMap[quote.Symbol].reg = false;
        klineSubRef.current?.unsubscribe();
        tickSubRef.current?.unsubscribe();
      } else if (top === 0 && right > 2000 && right < 4000) {
        regMap[quote.Symbol].reg = true;
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
      } else {
        return;
      }

      return () => {
        klineSubRef.current?.unsubscribe();
        tickSubRef.current?.unsubscribe();
      };
    }, options);

    observer.observe(stockRef.current);
    return () => observer.disconnect();
  }, []);

  if (!quote) {
    return <UnvisibleStock />;
  }
  return (
    <>
      <div className={cx("stock-item-wrap")} ref={stockRef}>
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
    </>
  );
};

export default React.memo(VisiableStock);
