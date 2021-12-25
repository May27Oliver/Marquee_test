import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useApexStateContext } from "context/Apex";
import Stock from "container/Stock";
import getMultiQuotes, { QuoteMap } from "./getMultiQuotes";
import api from "api";
import { gsap, Linear } from "gsap";

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

const registInterval = SINGLE_MOVE_OUT_SPEED * 2 * 1000;
const startInterval =
  (LINE_SPEED * 3 + LAST_LINE_SPEED + SINGLE_DELAY_TIME) * 1000;
let counter: NodeJS.Timeout;
let delayCounter: NodeJS.Timeout;
interface stockListType {
  symbols: string[];
}

const AnimeCSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const { masterSessionId, slaveSessionId } = useApexStateContext();
  //計算sliding window的pointer
  const roundRef = React.useRef<number>(0);
  const repeatRef = React.useRef<boolean>(false);
  //欲註冊的map
  const regMap = symbols.reduce<RegType>((acc, each, index) => {
    if (index < 30) {
      //起始前三十個都要是true
      acc[each] = { reg: true, index };
      return acc;
    }
    acc[each] = { reg: false, index };
    return acc;
  }, {});
  const RegRef = React.useRef<RegType>(regMap);
  const originScreenSymbols = symbols
    .map((symbol) => (RegRef.current[symbol].reg ? symbol : ""))
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
            //sliding
            RegRef.current = symbols.reduce<RegType>((acc, each, index) => {
              if (index < 30 + round && index >= round && index < 30) {
                acc[each] = { reg: true, index };
                return acc;
              }
              acc[each] = { reg: false, index };
              return acc;
            }, {});
            roundRef.current = roundRef.current + 2;
            return;
          } else if (disFromEnd < 2) {
            //差距小於二就從零再開始
            repeatRef.current = true;
            roundRef.current = 0;
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

          roundRef.current = roundRef.current + 2;
        }, registInterval);
      }, startInterval);
    });
  };
  //gsap animation
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
            onStart: () => {
              console.log("sliding animate onStart ");
              sliding_window_counter();
            },
          })
          .add(
            "firstTimeLabel",
            `+=${WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME}`
          );

        const firstLine = gsap.fromTo(
          refs,
          { x: 0, y: 0 },
          {
            x: -4515,
            y: 0,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        ); //左

        const secondLine = gsap.fromTo(
          refs,
          { x: 0, y: 178 },
          {
            x: -4515,
            y: 178,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        ); //左
        const thirdLine = gsap.fromTo(
          refs,
          { x: 0, y: 356 },
          {
            x: -4515,
            y: 356,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        ); //左

        const lastLine = gsap.fromTo(
          refs,
          { x: -2560, y: 534 },
          {
            x: -4515,
            y: 534,
            duration: LAST_LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        );
        // 鄰接最後的補充
        const initialRefs = refs.filter((_, index) => index < 31);
        const adjustFirstLine = gsap.fromTo(
          initialRefs,
          { x: 0, y: 0 },
          {
            x: -4515,
            y: 0,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        );
        const adjustSecondLine = gsap.fromTo(
          initialRefs,
          { x: 0, y: 178 },
          {
            x: -4515,
            y: 178,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        );
        const adjustThirdLine = gsap.fromTo(
          initialRefs,
          { x: 0, y: 356 },
          {
            x: -4515,
            y: 356,
            duration: LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        );
        const adjustLastLine = gsap.fromTo(
          initialRefs,
          { x: -2560, y: 534 },
          {
            x: -4515,
            y: 534,
            duration: LAST_LINE_SPEED,
            ease: Linear.easeNone,
            stagger: (index) => SINGLE_DELAY_TIME * index,
          }
        );

        timeline.add(firstLine);
        timeline.add(secondLine, LINE_SPEED.toString());
        timeline.add(thirdLine, (LINE_SPEED * 2).toString());
        timeline
          .add(lastLine, (LINE_SPEED * 3).toString())
          .add("lastLineAnime"); //label for fake loop

        //fake loop
        const WHOLE_TIME_FOR_SINGLE_STOCK = LINE_SPEED * 3 + LAST_LINE_SPEED;
        timeline.add(
          adjustFirstLine,
          `lastLineAnime-=${WHOLE_TIME_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME}`
        );
        timeline.add(
          adjustSecondLine,
          `lastLineAnime-=${
            WHOLE_TIME_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME - LINE_SPEED
          }`
        );
        timeline.add(
          adjustThirdLine,
          `lastLineAnime-=${
            WHOLE_TIME_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME - LINE_SPEED * 2
          }`
        );
        timeline
          .add(
            adjustLastLine,
            `lastLineAnime-=${
              WHOLE_TIME_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME - LINE_SPEED * 3
            }`
          )
          .add("shortCutPoint", `<+=${LAST_LINE_SPEED - SINGLE_DELAY_TIME}`);

        timeline.add(() => {
          console.log("執行剪接剪接");
          timeline.seek("firstTimeLabel");
        }, "shortCutPoint");
      }
    }, 1000);
  };
  let lastScreenSymbols = React.useRef<string[]>([]);
  //getQuotes && register
  React.useEffect(() => {
    if (!masterSessionId) return;
    (async () => {
      //關於取Quote：不重複取Quote原則，第一次動畫時進行sliding 會有很多symbol被重複取Quote，此處邏輯避免此狀況
      if (repeatRef.current) return; //如果動畫重複第二圈以後，不取Quote

      const lastSymbols = lastScreenSymbols.current;
      let getSymbols;

      if (lastSymbols.length === 0) {
        //上次暫存的symbols長度如為零代表第一圈，取滿30個quote
        getSymbols = [...onScreenSymbols];
      } else {
        //之後就取上次最後一位到新的最後一位symbols即可。
        const stIdx = onScreenSymbols.lastIndexOf(
          lastSymbols[lastSymbols.length - 1]
        );
        getSymbols = onScreenSymbols.slice(stIdx);
      }

      const quotesInfo = await getMultiQuotes({
        symbols: getSymbols,
        sessionId: masterSessionId,
      });

      setQuotes((prev) => Object.assign({}, prev, quotesInfo));
      lastScreenSymbols.current = [...onScreenSymbols];
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
