import React from "react";
import classNames from "classnames/bind";
import styles from "container/Setting/index.module.css";
import { useMarqueeDispatchContext } from "context/MarqueeConfig";
import api from "api";
const cx = classNames.bind(styles);

const ConfigSetting: React.FC = () => {
  const [speed, setSpeed] = React.useState<number>(40);
  const dispatch = useMarqueeDispatchContext();
  const setSpeedDispatch = (value: number) => {
    dispatch({ type: "SET_SPEED", payload: value });
  };

  React.useEffect(() => {
    (async () => {
      await api.updateSpeed(speed);
    })();
  }, [speed]);

  return (
    <>
      <div className={cx("setting-type-content")}>
        <div className={cx("setting-content-line")}>
          <div className={cx("setting-line-title")}>跑馬燈速度</div>
          <select
            className={cx("select-option")}
            name="speed"
            id="marquee-speed"
            onChange={(e) => {
              setSpeed(parseInt(e.target.value));
            }}
          >
            <option value={50}>50</option>
            <option value={45}>45</option>
            <option value={40} selected>
              40
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ConfigSetting;
