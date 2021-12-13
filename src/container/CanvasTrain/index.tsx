import React from "react";
import classNames from "classnames/bind";
import { useApexStateContext } from "context/Apex";
import styles from "./index.module.css";
import useMultiQuotes from "hooks/useMultiQuotes";
import api from "api";

const cx = classNames.bind(styles);
const FIRSTTIMESTAMP = new Date().setHours(9, 0, 0, 0);
const LASTTIMESTAMP = new Date().setHours(13, 30, 0, 0);
const PRICELENGTH = 50;
const TIMEGP = (LASTTIMESTAMP - FIRSTTIMESTAMP) / PRICELENGTH;

interface CanvasTrainType {
  symbols: string[];
}

const CanvasTrain: React.FC<CanvasTrainType> = ({ symbols }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
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
  console.log("quotes?.[0]", quotes?.["2330.TW"]);

  React.useEffect(() => {
    if (!quotes?.["2330.TW"]) {
      return;
    }
    const { NameSlave } = quotes["2330.TW"];
    const [stockName] = NameSlave ? NameSlave.split(".") : [""];
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = "75px Noto Sans TC";
        ctx.fillStyle = "White";
        ctx.fillText(stockName, 200, 200);

        // ctx.fillStyle = "rgb(200,0,0)";
        // ctx.fillRect(10, 10, 55, 50);

        // ctx.fillStyle = "rgba(0,0,200,0.5)";
        // ctx.fillRect(30, 30, 55, 50);
        // ctx.beginPath();
        // ctx.arc(50, 50, 50, 0, 2 * Math.PI);
        // ctx.fill();
      }
    }
  }, []);

  return (
    <canvas
      className={cx("canvas-train")}
      ref={canvasRef}
      width={3840}
      height={712}
    ></canvas>
  );
};

export default CanvasTrain;
