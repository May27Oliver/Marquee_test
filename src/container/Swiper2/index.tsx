import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useHistory } from "react-router";

const cx = classNames.bind(styles);

const Part2: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      {/* <marquee behavior="scroll" direction="left">
        Hello World
      </marquee> */}
      <div className={cx("marquee-container")}>
        <span className={cx("marquee-wrap")}>
          <span>
            <div className={cx("marquee-item")}>Cow夭～</div>
            <div className={cx("marquee-item")}>Cow夭～</div>
          </span>
          <span>
            <div className={cx("marquee-item")}>Cow夭～</div>
            <div className={cx("marquee-item")}>Cow夭～</div>
          </span>
          {/*  <div className={cx("marquee-item")}>Cow夭～</div> */}
        </span>
      </div>
      <div className={cx("marquee-right-container")}>
        <div className={cx("marquee-item")}>
          Bug怎麼又生了一排？Bug怎麼又生了一排？Bug怎麼又生了一排？Bug怎麼又生了一排？
        </div>
      </div>
    </div>
  );
};

export default Part2;
