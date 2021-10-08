import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useHistory } from "react-router";

const cx = classNames.bind(styles);

const Part3: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <h1
        className={cx("hello")}
        onClick={() => {
          history.push("./part4");
        }}
      >
        嗨你好3
      </h1>
    </div>
  );
};

export default Part3;
