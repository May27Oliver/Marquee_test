import React from "react";
import classNames from "classnames/bind";
import styles from "container/Setting/index.module.css";
import api from "api";

const cx = classNames.bind(styles);

const ConfigSetting: React.FC = () => {
  const [speed, setSpeed] = React.useState<number | null>(null);
  const [direction, setDirection] = React.useState<number | null>(null);

  React.useEffect(() => {
    (async () => {
      // const response = await api.querySpeed();
      const [dirRes, speedRes] = await Promise.all([
        api.getDirection(),
        api.querySpeed(),
      ]);

      if (!speedRes.result || !speedRes.speed) return;
      setSpeed(speedRes.speed);
      console.log("dirRes", dirRes);
      if (!dirRes.result || !dirRes.direction) return;
      setDirection(dirRes.direction);
    })();
  }, []);

  return (
    <>
      <div className={cx("setting-type-content")}>
        <div className={cx("setting-content-line")}>
          <div className={cx("setting-line-title")}>跑馬燈速度</div>
          {speed && (
            <select
              className={cx("select-option")}
              id="marquee-speed"
              value={speed}
              onChange={(e) => {
                const newSpeed = parseInt(e.target.value);
                setSpeed(newSpeed);
                (async () => {
                  await api.updateSpeed(newSpeed);
                })();
              }}
            >
              <option value={40}>40</option>
              <option value={45}>45</option>
              <option value={50}>50</option>
            </select>
          )}
        </div>
        {/* 跑馬燈方向 */}
        <div className={cx("setting-content-line")}>
          <div className={cx("setting-line-title")}>跑馬燈方向</div>
          {direction && (
            <select
              className={cx("select-option")}
              id="marquee-direction"
              value={direction}
              onChange={(e) => {
                const newDirection = parseInt(e.target.value);
                setDirection(newDirection);
                (async () => {
                  await api.updateDirection(newDirection);
                })();
              }}
            >
              <option value={1}>左</option>
              <option value={2}>右</option>
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfigSetting;
