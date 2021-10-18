import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { gsap } from "gsap";

const cx = classNames.bind(styles);

const Swiper3: React.FC = () => {
  React.useEffect(() => {
    var colors = ["#f38630", "#6fb936", "#ccc", "#6fb936"];

    //initially colorize each box and position in a row
    gsap.set(`.${cx("box1")}`, {
      backgroundColor: (i) => colors[i % colors.length],
      x: (i) => i * 50,
    });

    gsap.to(`.${cx("box1")}`, {
      duration: 5,
      ease: "none",
      x: "-=500", //move each box 500px to right
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 500), //force x value to be between 0 and 500 using modulus
      },
      repeat: -1,
    });
    gsap.set(`.${cx("box2")}`, {
      backgroundColor: (i) => colors[i % colors.length],
      x: (i) => i * 50,
    });

    gsap.to(`.${cx("box2")}`, {
      duration: 5,
      ease: "none",
      x: "+=500", //move each box 500px to left
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 500), //force x value to be between 0 and 500 using modulus
      },
      repeat: -1,
    });
  }, []);
  return (
    <>
      <div>
        <div className={cx("wrapper")}>
          <div className={cx("boxes")}>
            <span>
              <div className={cx("box1")}>1</div>
              <div className={cx("box1")}>2</div>
              <div className={cx("box1")}>3</div>
              <div className={cx("box1")}>4</div>
              <div className={cx("box1")}>5</div>
              <div className={cx("box1")}>6</div>
              <div className={cx("box1")}>7</div>
              <div className={cx("box1")}>8</div>
              <div className={cx("box1")}>9</div>
              <div className={cx("box1")}>10</div>
            </span>
            <span>
              <div className={cx("box1")}>1</div>
              <div className={cx("box1")}>2</div>
              <div className={cx("box1")}>3</div>
              <div className={cx("box1")}>4</div>
              <div className={cx("box1")}>5</div>
              <div className={cx("box1")}>6</div>
              <div className={cx("box1")}>7</div>
              <div className={cx("box1")}>8</div>
              <div className={cx("box1")}>9</div>
              <div className={cx("box1")}>10</div>
            </span>
          </div>
        </div>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("boxes")}>
          <div className={cx("box2")}>1</div>
          <div className={cx("box2")}>2</div>
          <div className={cx("box2")}>3</div>
          <div className={cx("box2")}>4</div>
          <div className={cx("box2")}>5</div>
          <div className={cx("box2")}>6</div>
          <div className={cx("box2")}>7</div>
          <div className={cx("box2")}>8</div>
          <div className={cx("box2")}>9</div>
          <div className={cx("box2")}>10</div>
        </div>
      </div>
    </>
  );
};

export default Swiper3;
