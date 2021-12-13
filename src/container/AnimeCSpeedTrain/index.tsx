import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useApexStateContext } from "context/Apex";
import Stock from "container/Stock";
import getMultiQuotes, { QuoteMap } from "./getMultiQuotes";
import api from "api";
import { gsap, Linear, TweenMax } from "gsap";
import { symbol } from "prop-types";
import { finished } from "stream";

const cx = classNames.bind(styles);
const FIRSTTIMESTAMP = new Date().setHours(9, 0, 0, 0);
const LASTTIMESTAMP = new Date().setHours(13, 30, 0, 0);
const PRICELENGTH = 50;
const TIMEGP = (LASTTIMESTAMP - FIRSTTIMESTAMP) / PRICELENGTH;
const SINGLE_STOCK_WITH = 674;
const LINE_SPEED = 45;
const SINGLE_MOVE_OUT_SPEED = (674 * LINE_SPEED) / 4515;
const LAST_LINE_SPEED = (1955 * LINE_SPEED) / 4515;
const SCREEN_WITH = 3840 + SINGLE_STOCK_WITH;
const SINGLE_DELAY_TIME = (674 * LINE_SPEED) / SCREEN_WITH;
const getDelayTime = (symbols: string[]) => {
  if (symbols.length > 23) {
    return (symbols.length - 23) * SINGLE_DELAY_TIME;
  } else {
    return 0;
  }
};

const registInterval = SINGLE_MOVE_OUT_SPEED * 2 * 1000;
const startInterval =
  (LINE_SPEED * 3 + LAST_LINE_SPEED + SINGLE_DELAY_TIME) * 1000;
let counter: NodeJS.Timeout;
let delayCounter: NodeJS.Timeout;
interface stockListType {
  symbols: string[];
}

const AnimeCSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  // symbols = symbols.concat(symbols.slice(0, 25));
  const { masterSessionId, slaveSessionId } = useApexStateContext();
  //計算sliding window的pointer
  const roundRef = React.useRef<number>(0);
  //欲註冊的map || index >= symbols.length - 25
  const regMap = symbols.reduce<RegType>((acc, each, index) => {
    if (index < 30) {
      //起始前三十個和後面鄰接上的25個都要是true
      acc[each] = { reg: true, index };
      return acc;
    }
    acc[each] = { reg: false, index };
    return acc;
  }, {});
  const RegRef = React.useRef<RegType>(regMap);
  const originScreenSymbols = symbols
    .map((symbol) => (RegRef.current[symbol].reg ? symbol : ""))
    // .filter((el, index) => symbols.indexOf(el) === index)
    .filter(Boolean);

  const [onScreenSymbols, setOnScreenSymbols] =
    React.useState<string[]>(originScreenSymbols);
  const [quotes, setQuotes] = React.useState<QuoteMap>({});
  //取得每檔股票dom元素
  const stockRefs = React.useRef<React.RefObject<HTMLLIElement>[]>(
    symbols.map((_, i) => {
      return createRef();
    })
  );
  console.log("slide onScreenSymbols", onScreenSymbols);

  const sliding_window_counter = () => {
    clearInterval(counter);
    clearTimeout(delayCounter);
    RegRef.current = regMap;
    setOnScreenSymbols(originScreenSymbols);
    roundRef.current = 0;
    window.requestAnimationFrame(() => {
      delayCounter = setTimeout(() => {
        counter = setInterval(() => {
          //固定時間註冊數往後移
          const round = roundRef.current;
          const disFromEnd = symbols.length - round;
          //如果逼近最後三十個，則不進行slide，pointer繼續往下
          if (disFromEnd < 30) {
            console.log(
              "sliding keep",
              symbols[roundRef.current],
              "no.",
              roundRef.current
            );
            roundRef.current = roundRef.current + 2;
            return;
          }
          //sliding
          RegRef.current = symbols.reduce<RegType>((acc, each, index) => {
            if (index < 30 + round && index >= round) {
              acc[each] = { reg: true, index };
              return acc;
            }
            acc[each] = { reg: false, index };
            return acc;
          }, {});

          setOnScreenSymbols(
            symbols
              .map((symbol) => (RegRef.current[symbol].reg ? symbol : ""))
              .filter(Boolean)
          );

          console.log(
            "sliding continue",
            symbols[roundRef.current],
            "no.",
            roundRef.current
          );
          roundRef.current = roundRef.current + 2;
        }, registInterval);
      }, startInterval);
    });
  };

  // const animationMarquee = () => {
  //   setTimeout(() => {
  //     const refs = stockRefs.current.map((item) => {
  //       return item.current;
  //     });
  //     if (refs.includes(null)) {
  //       window.requestAnimationFrame(animationMarquee);
  //     } else {
  //       const WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK =
  //         LINE_SPEED * 3 + LAST_LINE_SPEED;
  //       const timeline = gsap.timeline({
  //         repeat: -1,
  //         onStart: () => {
  //           console.log("sliding animate onStart ");
  //           sliding_window_counter();
  //         },
  //         onRepeat: () => {
  //           console.log("sliding animation onRepeat");
  //           sliding_window_counter();
  //         },
  //       });

  //       timeline.fromTo(
  //         refs,
  //         { x: 0, y: 0 },
  //         {
  //           x: -4515,
  //           y: 0,
  //           duration: LINE_SPEED,
  //           ease: Linear.easeNone,
  //           stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
  //         }
  //       ); //左

  //       timeline.fromTo(
  //         refs,
  //         { x: 0, y: 178 },
  //         {
  //           x: -4515,
  //           y: 178,
  //           duration: LINE_SPEED,
  //           ease: Linear.easeNone,
  //           stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
  //         },
  //         LINE_SPEED.toString()
  //       ); //左

  //       timeline.fromTo(
  //         refs,
  //         { x: 0, y: 356 },
  //         {
  //           x: -4515,
  //           y: 356,
  //           duration: LINE_SPEED,
  //           ease: Linear.easeNone,
  //           stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
  //         },
  //         (LINE_SPEED * 2).toString()
  //       ); //左

  //       timeline.fromTo(
  //         refs,
  //         { x: -2560, y: 534 },
  //         {
  //           x: -4515,
  //           y: 534,
  //           duration: LAST_LINE_SPEED,
  //           ease: Linear.easeNone,
  //           stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
  //         },
  //         (LINE_SPEED * 3).toString()
  //       );

  //       // timeline.seek("first_achieve");

  //       // timeline.add("first_achieve", WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK);
  //     }
  //   }, 1000);
  // };

  const animationMarquee = () => {
    setTimeout(() => {
      const refs = stockRefs.current.map((item) => {
        return item.current;
      });
      if (refs.includes(null)) {
        window.requestAnimationFrame(animationMarquee);
      } else {
        const WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK =
          LINE_SPEED * 3 + LAST_LINE_SPEED;
        const timeline = gsap
          .timeline({
            repeat: -1,
            onStart: () => {
              console.log("sliding animate onStart ");
              sliding_window_counter();
            },
            onRepeat: () => {
              console.log("sliding animation onRepeat");
              sliding_window_counter();
            },
          })
          .add("firstTimeLabel", `+=${WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK}`);

        const firstLine = gsap.timeline().fromTo(
          refs,
          { x: 0, y: 0 },
          {
            x: -4515,
            y: 0,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
          }
        ); //左
        // const firstLineDuration = firstLine.totalDuration();
        const secondLine = gsap.timeline().fromTo(
          refs,
          { x: 0, y: 178 },
          {
            x: -4515,
            y: 178,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
          }
        ); //左
        // const secondLineDuration = secondLine.totalDuration();

        const thirdLine = gsap.timeline().fromTo(
          refs,
          { x: 0, y: 356 },
          {
            x: -4515,
            y: 356,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
          }
        ); //左
        // const thirdLineDuration = secondLine.totalDuration();
        const lastLine = gsap
          .timeline()
          .fromTo(
            refs,
            { x: -2560, y: 534 },
            {
              x: -4515,
              y: 534,
              duration: LAST_LINE_SPEED,
              ease: Linear.easeNone,
              stagger: (index, target, list) => SINGLE_DELAY_TIME * index,
            }
          )
          .add("lastLineLabel", `-=${WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK}`);

        // const lastLineDuration = secondLine.totalDuration();
        // console.log("firstLine Duration", firstLineDuration);
        // console.log("lastLine Duration", lastLineDuration);
        // console.log("secondLine Duration", secondLineDuration);
        // console.log("thirdLine Duration", thirdLineDuration);

        timeline.add(firstLine);
        timeline.add(secondLine, LINE_SPEED.toString());
        timeline.add(thirdLine, (LINE_SPEED * 2).toString());
        timeline.add(lastLine, (LINE_SPEED * 3).toString());
        // const timelineDuration = timeline.totalDuration();
        // console.log("timeline Duration", timelineDuration);
        // timeline.add("first_achieve", WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK);
        // timeline.seek("first_achieve");
      }
    }, 1000);
  };

  //getQuotes && register
  React.useEffect(() => {
    console.log("執行取Quote註冊");
    if (!masterSessionId) return;
    (async () => {
      const quotesInfo = await getMultiQuotes({
        symbols: onScreenSymbols,
        sessionId: masterSessionId,
      });
      setQuotes(quotesInfo);
    })();

    //過濾出要註冊的symbols
    api.registerTick({
      symbols: onScreenSymbols,
      types: ["KLine", "Tick"],
      masterSessionId,
      slaveSessionId,
    });
  }, [masterSessionId, onScreenSymbols]);

  React.useEffect(() => {
    // 避免轉換WebTab造成gsap動畫出現延遲或中斷，監聽blur事件。
    window.addEventListener(
      "blur",
      function () {
        console.log("blur called");
        gsap.ticker.lagSmoothing(0);
      },
      false
    );
    window.requestAnimationFrame(() => {
      animationMarquee();
    });
  }, []);

  return (
    <>
      <div className={cx("stocks-container")}>
        <div className={cx("stock-ship")}>
          <StockTrain
            regMap={RegRef.current}
            quotes={quotes}
            symbols={symbols}
            stockRefs={stockRefs.current}
          />
        </div>
      </div>
    </>
  );
};

export type RegType = {
  [symbol: string]: { reg: boolean; index: number };
};
interface StockTrainType extends stockListType {
  quotes: QuoteMap;
  regMap: RegType;
  stockRefs: React.RefObject<HTMLLIElement>[];
}
const StockTrain: React.FC<StockTrainType> = ({
  quotes,
  regMap,
  symbols,
  stockRefs,
}) => {
  const AppRef = React.useRef<Element | null>(null);
  AppRef.current = document.getElementsByClassName("App")[0];
  return (
    <>
      {symbols.map((symbol, index) => (
        <Stock
          AppRef={AppRef.current}
          key={symbol}
          symbol={symbol}
          quote={quotes?.[symbol]}
          regMap={regMap}
          firstTimeStamp={FIRSTTIMESTAMP}
          timeGap={TIMEGP}
          ref={stockRefs[index]}
        />
      ))}
    </>
  );
};

export default AnimeCSpeedTrain;
