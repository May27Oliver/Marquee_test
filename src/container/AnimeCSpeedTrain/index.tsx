import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useApexStateContext } from "context/Apex";
import Stock, { UnvisibleStock } from "container/Stock";
import getMultiQuotes, { QuoteMap } from "./getMultiQuotes";
import api from "api";
import { gsap, Linear } from "gsap";

import VisiableStock from "container/VisibleStock";

const cx = classNames.bind(styles);

const FIRSTTIMESTAMP = new Date().setHours(9, 0, 0, 0);
const LASTTIMESTAMP = new Date().setHours(13, 30, 0, 0);
const PRICELENGTH = 50;
const TIMEGP = (LASTTIMESTAMP - FIRSTTIMESTAMP) / PRICELENGTH;
const SINGLE_STOCK_WITH = 674;

interface stockListType {
  symbols: string[];
  speed: number;
  direction: number;
}

const LEFTCONFIG = {
  lineBeginX: 0,
  lineEndX: -4515,
  lastLineBeginX: -2560,
  lastLineEndX: -4515,
};
const RIGHTCONFIG = {
  lineBeginX: -4515,
  lineEndX: 0,
  lastLineBeginX: -4515,
  lastLineEndX: -2560,
};

interface DirType {
  lineBeginX: number;
  lineEndX: number;
  lastLineBeginX: number;
  lastLineEndX: number;
}

const getDirectionConfig = (direction: number): DirType => {
  if (direction === 1) {
    return LEFTCONFIG;
  } else if (direction === 2) {
    return RIGHTCONFIG;
  }
  return LEFTCONFIG;
};

const AnimeCSpeedTrain: React.FC<stockListType> = ({
  symbols,
  speed,
  direction,
}) => {
  const { lineBeginX, lineEndX, lastLineBeginX, lastLineEndX } =
    getDirectionConfig(direction);

  const LINE_SPEED = speed;
  const SINGLE_MOVE_OUT_SPEED = (674 * LINE_SPEED) / 4515;
  const LAST_LINE_SPEED = (1955 * LINE_SPEED) / 4515;
  const SCREEN_WITH = 3840 + SINGLE_STOCK_WITH;
  const SINGLE_DELAY_TIME = (674 * LINE_SPEED) / SCREEN_WITH;

  const registInterval = SINGLE_MOVE_OUT_SPEED * 2;
  const startInterval = LINE_SPEED * 3 + LAST_LINE_SPEED + SINGLE_DELAY_TIME;
  const { slaveSessionId } = useApexStateContext();
  //計算sliding window的pointer
  const [repeat, setRepeat] = React.useState<boolean>(false); //重複第二圈時為true
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

  //gsap animation
  const animationMarquee = () => {
    setTimeout(() => {
      const refs = stockRefs.current.map((item) => {
        return item.current;
      });
      if (refs.includes(null)) {
        window.requestAnimationFrame(animationMarquee);
      } else {
        if (symbols.length > 60) {
          animationForMoreThanFiftyStocks(refs);
        } else if (symbols.length < 24) {
          animationForLessThanTwentyFour(refs);
        }
      }
    }, 1000);
  };

  const animationForLessThanTwentyFour = (refs: (HTMLLIElement | null)[]) => {
    const WHOLE_TIME_FOR_SINGLE_STOCK = LINE_SPEED * 3 + LAST_LINE_SPEED;
    const timeline = gsap.timeline();
    const firstLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 0 },
      {
        x: lineEndX,
        y: 0,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );

    const secondLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 178 },
      {
        x: lineEndX,
        y: 178,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );

    const thirdLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 356 },
      {
        x: lineEndX,
        y: 356,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );

    const lastLine = gsap.fromTo(
      refs,
      { x: lastLineBeginX, y: 534 },
      {
        x: lastLineEndX,
        y: 534,
        duration: LAST_LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );

    const adjustFirstLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 0 },
      {
        x: lineEndX,
        y: 0,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    const adjustSecondLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 178 },
      {
        x: lineEndX,
        y: 178,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    const adjustThirdLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 356 },
      {
        x: lineEndX,
        y: 356,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    const adjustLastLine = gsap.fromTo(
      refs,
      { x: lastLineBeginX, y: 534 },
      {
        x: lastLineEndX,
        y: 534,
        duration: LAST_LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );

    //animation start
    timeline.add(firstLine);
    timeline.add(secondLine, LINE_SPEED.toString());
    timeline.add(thirdLine, (LINE_SPEED * 2).toString()).add("lastLineAnime");
    timeline.add(lastLine, (LINE_SPEED * 3).toString());
    timeline.add("shortcutpoint", WHOLE_TIME_FOR_SINGLE_STOCK.toString());
    timeline.add(adjustFirstLine, WHOLE_TIME_FOR_SINGLE_STOCK.toString());
    timeline.add(() => {
      setRepeat(true);
    }, WHOLE_TIME_FOR_SINGLE_STOCK.toString());
    timeline.add(
      adjustSecondLine,
      (WHOLE_TIME_FOR_SINGLE_STOCK + LINE_SPEED).toString()
    );
    timeline.add(
      adjustThirdLine,
      (WHOLE_TIME_FOR_SINGLE_STOCK + LINE_SPEED * 2).toString()
    );
    timeline.add(
      adjustLastLine,
      (WHOLE_TIME_FOR_SINGLE_STOCK + LINE_SPEED * 3).toString()
    );
    timeline.add(() => {
      timeline.seek("shortcutpoint");
    }, (WHOLE_TIME_FOR_SINGLE_STOCK * 2).toString());
  };

  const animationForMoreThanFiftyStocks = (refs: (HTMLLIElement | null)[]) => {
    const WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK =
      LINE_SPEED * 3 + LAST_LINE_SPEED;
    const timeline = gsap
      .timeline()
      .add(
        "firstTimeLabel",
        `+=${WHOLE_ANIMATION_SPEED_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME}`
      );

    const firstLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 0 },
      {
        x: lineEndX,
        y: 0,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    ); //左

    const secondLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 178 },
      {
        x: lineEndX,
        y: 178,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    ); //左
    const thirdLine = gsap.fromTo(
      refs,
      { x: lineBeginX, y: 356 },
      {
        x: lineEndX,
        y: 356,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    ); //左

    const lastLine = gsap.fromTo(
      refs,
      { x: lastLineBeginX, y: 534 },
      {
        x: lastLineEndX,
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
      { x: lineBeginX, y: 0 },
      {
        x: lineEndX,
        y: 0,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    const adjustSecondLine = gsap.fromTo(
      initialRefs,
      { x: lineBeginX, y: 178 },
      {
        x: lineEndX,
        y: 178,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    const adjustThirdLine = gsap.fromTo(
      initialRefs,
      { x: lineBeginX, y: 356 },
      {
        x: lineEndX,
        y: 356,
        duration: LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    const adjustLastLine = gsap.fromTo(
      initialRefs,
      { x: lastLineBeginX, y: 534 },
      {
        x: lastLineEndX,
        y: 534,
        duration: LAST_LINE_SPEED,
        ease: Linear.easeNone,
        stagger: (index) => SINGLE_DELAY_TIME * index,
      }
    );
    //animation start
    timeline.add(firstLine);
    timeline.add(secondLine, LINE_SPEED.toString());
    timeline.add(thirdLine, (LINE_SPEED * 2).toString());
    timeline.add(lastLine, (LINE_SPEED * 3).toString()).add("lastLineAnime"); //label for fake loop

    //fake loop
    const WHOLE_TIME_FOR_SINGLE_STOCK = LINE_SPEED * 3 + LAST_LINE_SPEED;
    timeline
      .add(
        adjustFirstLine,
        `lastLineAnime-=${WHOLE_TIME_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME}`
      )
      .add(() => {
        setRepeat(true);
      }, `lastLineAnime-=${WHOLE_TIME_FOR_SINGLE_STOCK - SINGLE_DELAY_TIME}`);
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

    //飛雷神之術，回到起點
    timeline.add(() => {
      timeline.seek("firstTimeLabel");
    }, "shortCutPoint");

    //sliding counter
    const registTimes = (symbols.length - 30) / 2;
    for (let i = 0; i < registTimes + 1; i++) {
      timeline.add(() => {
        if (i === registTimes) {
          //最後ㄧround，要註冊60個symbols
          if (!repeat) {
            setRepeat(true);
          }
          RegRef.current = symbols.reduce<RegType>((acc, each, index) => {
            if (index < 30 || index > symbols.length - 30) {
              acc[each] = { reg: true, index };
              return acc;
            }
            acc[each] = { reg: false, index };
            return acc;
          }, {});
        } else {
          //sliding
          RegRef.current = symbols.reduce<RegType>((acc, each, index) => {
            if (index >= i * 2 && index < 30 + i * 2) {
              acc[each] = { reg: true, index };
              return acc;
            }
            acc[each] = { reg: false, index };
            return acc;
          }, {});
        }
        setOnScreenSymbols(
          symbols
            .map((symbol) => (RegRef.current[symbol].reg ? symbol : ""))
            .filter(Boolean)
        );
      }, startInterval + registInterval * i);
    }
  };

  //getQuotes && register
  React.useEffect(() => {
    if (!slaveSessionId) return;
    (async () => {
      const quotesInfo = await getMultiQuotes({
        symbols: onScreenSymbols,
        sessionId: slaveSessionId,
      });
      setQuotes((prev) => {
        let newQoutes = { ...prev };
        for (let key in quotesInfo) {
          if (!newQoutes[key]) {
            newQoutes[key] = quotesInfo[key];
          }
        }
        return newQoutes;
      });
    })();

    //過濾出要註冊的symbols
    api.registerTick({
      symbols: onScreenSymbols,
      types: ["KLine", "Tick"],
      slaveSessionId,
    });
  }, [slaveSessionId, onScreenSymbols]);

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
            repeat={repeat}
            quotes={quotes}
            direction={direction}
            speed={speed}
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
  repeat: boolean;
  quotes: QuoteMap;
  stockRefs: React.RefObject<HTMLLIElement>[];
}

export type GetKLinType = {
  getKLineApi: () => void;
};

const StockTrain: React.FC<StockTrainType> = ({
  repeat,
  quotes,
  symbols,
  stockRefs,
}) => {
  const [getKLineRefs] = React.useState<React.RefObject<GetKLinType>[]>(
    symbols.map((item) => {
      return createRef<GetKLinType>();
    })
  );

  React.useEffect(() => {
    const options = {
      root: document.getElementsByClassName("App")[0],
      rootMargin: "0px",
      threshold: 1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;
        const [, idx] = target.className.split(" ");
        const { top, right } = target.getBoundingClientRect();
        if (top === 0 && right > 1000 && right < 4500 && repeat) {
          getKLineRefs[Number(idx)].current?.getKLineApi();
        }
      });
    }, options);

    stockRefs.forEach((item) => {
      if (!item.current) return;
      observer.observe(item.current);
    });
    return () => observer.disconnect();
  }, [getKLineRefs, stockRefs, repeat]);

  return (
    <>
      {symbols.map((symbol, index) => (
        <Stock key={symbol} ref={stockRefs[index]} idx={index}>
          {quotes[symbol] ? (
            <VisiableStock
              symbol={symbol}
              quote={quotes?.[symbol]}
              key={quotes?.[symbol].NameSlave}
              firstTimeStamp={FIRSTTIMESTAMP}
              timeGap={TIMEGP}
              ref={getKLineRefs[index]}
            />
          ) : (
            <UnvisibleStock symbol={symbol} />
          )}
        </Stock>
      ))}
    </>
  );
};

export default AnimeCSpeedTrain;
