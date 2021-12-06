import React, { createRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useApexStateContext } from "context/Apex";
import Stock from "container/Stock";
import LoadingOverlay from "component/LoadingOverlay";
import useMultiQuotes from "hooks/useMultiQuotes";
import api from "api";
import { gsap, Linear } from "gsap";

const cx = classNames.bind(styles);
const FIRSTTIMESTAMP = new Date().setHours(9, 0, 0, 0);
const LASTTIMESTAMP = new Date().setHours(13, 30, 0, 0);
const PRICELENGTH = 50;
const TIMEGP = (LASTTIMESTAMP - FIRSTTIMESTAMP) / PRICELENGTH;

interface stockListType {
  symbols: string[];
}

const AnimeCSpeedTrain: React.FC<stockListType> = ({ symbols }) => {
  const SINGLE_STOCK_WITH = 674;
  const LINE_SPEED = 30;
  const LAST_LINE_SPEED = (1955 * LINE_SPEED) / 4515;
  const SCREEN_WITH = 3840 + SINGLE_STOCK_WITH;
  const SINGLE_DELAY_TIME = (674 * LINE_SPEED) / SCREEN_WITH;
  const getDelayTime = (symbols: string[]) => {
    if (symbols.length > 23) {
      return (symbols.length - 23) * (SINGLE_DELAY_TIME / 1000);
    } else {
      return 0;
    }
  };

  const WHOLE_DELAY_TIME = getDelayTime(symbols);
  console.log("WHOLE_DELAY_TIME", WHOLE_DELAY_TIME);
  //取得每檔股票dom元素
  const stockRefs = React.useRef<React.RefObject<HTMLLIElement>[]>(
    symbols.map((_, i) => {
      return createRef();
    })
  );

  // const animationMarquee = () => {
  //   setTimeout(() => {
  //     const refs = stockRefs.current.map((item) => {
  //       return item.current;
  //     });
  //     if (refs.includes(null)) {
  //       window.requestAnimationFrame(animationMarquee);
  //     } else {
  //       refs.forEach((item, index) => {
  //         window.requestAnimationFrame(() => {
  //           setTimeout(() => {
  //             gsap
  //               .timeline({ repeat: -1, repeatDelay: WHOLE_DELAY_TIME })
  //               .fromTo(
  //                 item,
  //                 { x: 0, y: 0 },
  //                 {
  //                   x: -4515,
  //                   y: 0,
  //                   duration: LINE_SPEED,
  //                   ease: Linear.easeNone,
  //                 }
  //               ) //左
  //               .fromTo(
  //                 item,
  //                 { x: 0, y: 178 },
  //                 {
  //                   x: -4515,
  //                   y: 128,
  //                   duration: LINE_SPEED,
  //                   ease: Linear.easeNone,
  //                 }
  //               ) //左
  //               .fromTo(
  //                 item,
  //                 { x: 0, y: 306 },
  //                 {
  //                   x: -4515,
  //                   y: 256,
  //                   duration: LINE_SPEED,
  //                   ease: Linear.easeNone,
  //                 }
  //               ) //左
  //               .fromTo(
  //                 item,
  //                 { x: -2560, y: 434 },
  //                 {
  //                   x: -4515,
  //                   y: 384,
  //                   duration: LAST_LINE_SPEED,
  //                   ease: Linear.easeNone,
  //                 }
  //               ); //左
  //           }, index * SINGLE_DELAY_TIME * 1000);
  //         });
  //       });
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
        gsap
          .timeline({ repeat: -1, repeatDelay: WHOLE_DELAY_TIME })
          .fromTo(
            refs,
            { x: 0, y: 0 },
            {
              x: -4515,
              y: 0,
              duration: LINE_SPEED,
              ease: Linear.easeNone,
              stagger: SINGLE_DELAY_TIME,
            }
          ) //左
          .fromTo(
            refs,
            { x: 0, y: 178 },
            {
              x: -4515,
              y: 178,
              duration: LINE_SPEED,
              ease: Linear.easeNone,
              stagger: SINGLE_DELAY_TIME,
            },
            `-=97.2`
          ) //左
          .fromTo(
            refs,
            { x: 0, y: 356 },
            {
              x: -4515,
              y: 356,
              duration: LINE_SPEED,
              ease: Linear.easeNone,
              stagger: SINGLE_DELAY_TIME,
            },
            `-=97.2`
          ) //左
          .fromTo(
            refs,
            { x: -2560, y: 534 },
            {
              x: -4515,
              y: 534,
              duration: LAST_LINE_SPEED,
              ease: Linear.easeNone,
              stagger: SINGLE_DELAY_TIME,
            },
            `-=98.1`
          ); //左
      }
    }, 1000);
  };

  //取得所有quote資訊後設定ul外寬
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
          <StockTrain symbols={symbols} stockRefs={stockRefs.current} />
        </div>
      </div>
    </>
  );
};

interface StockTrainType extends stockListType {
  stockRefs: React.RefObject<HTMLLIElement>[];
}

const StockTrain: React.FC<StockTrainType> = ({ symbols, stockRefs }) => {
  const { masterSessionId, slaveSessionId } = useApexStateContext();
  //取得所有quotes
  const {
    loading,
    value: quotes,
    error,
  } = useMultiQuotes({
    symbols,
    sessionId: masterSessionId,
  });

  React.useEffect(() => {
    api.registerTick({
      symbols: symbols,
      types: ["KLine", "Tick"],
      masterSessionId,
      slaveSessionId,
    });
  }, [masterSessionId, slaveSessionId, symbols]);

  if (error || !quotes) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        發生錯誤: {error?.message}
      </div>
    );
  }

  return (
    <>
      {loading && <LoadingOverlay isOpen />}
      {symbols.map((symbol, index) => (
        <Stock
          key={quotes[symbol].NameSlave}
          quote={quotes[symbol]}
          firstTimeStamp={FIRSTTIMESTAMP}
          timeGap={TIMEGP}
          ref={stockRefs[index]}
        />
      ))}
    </>
  );
};

export default AnimeCSpeedTrain;
