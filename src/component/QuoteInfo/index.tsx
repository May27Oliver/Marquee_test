import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { priceFormatterFactory } from "tools/formatter";

import styles from "./index.module.css";

const cx = classNames.bind(styles);
const MAX_DISPLAY_FRACTION_DIGITS = 4;

export interface QuoteInfoProps {
  price: number | null;
  upDown: number | null;
  upDownRate: number | null;
  fractionDigits: number | null;
  denominator: number | null;
  className?: string;
  childrenClassName?: string;
}

const QuoteInfo: React.FC<QuoteInfoProps> = ({
  price,
  upDown,
  upDownRate,
  fractionDigits,
  denominator,
  className = "",
}) => {
  fractionDigits = fractionDigits || 0;
  denominator = denominator || 0;
  //price
  const color = !upDown || upDown === 0 ? "equal" : upDown > 0 ? "up" : "down";
  const priceDisplay = priceFormatterFactory({
    denominator: denominator,
    fractionDigits: Math.min(fractionDigits, MAX_DISPLAY_FRACTION_DIGITS),
  })(price, "--");

  //upDowns
  const upDownDisplay = priceFormatterFactory({
    denominator: denominator,
    fractionDigits: Math.min(fractionDigits, MAX_DISPLAY_FRACTION_DIGITS),
  })(upDown, "--");
  const upDownRateDisplay =
    upDownRate === null
      ? "--"
      : upDownRate <= 0
      ? `${upDownRate}`
      : `+${upDownRate}`;

  return (
    <div className={`${cx("container")} ${className}`}>
      <div className={cx("row", "top")}>
        <div className={`${cx("up-down", color)} left`}>
          {`${upDownRateDisplay}%`}
        </div>
      </div>
      <div className={cx("row", "bottom")}>
        <div className={`${cx("price", "left", color)} `}>{priceDisplay}</div>
        <div className={cx("price", "right", "up-down-diff", color)}>
          {upDown && upDown !== 0 ? (
            <FontAwesomeIcon
              icon={faCaretUp}
              className={cx(upDown < 0 && "down")}
            />
          ) : (
            ""
          )}
          <div className={cx("upDownDisplay")}>
            {upDown === 0 ? "--" : upDownDisplay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteInfo;
