import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import anime from "animejs";
import { useUpdateEffect } from "react-use";

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
          <AnimationBottomBorder compareValue={upDownRateDisplay}>
            {`${upDownRateDisplay}%`}
          </AnimationBottomBorder>
        </div>
      </div>
      <div className={cx("row", "bottom")}>
        <div className={`${cx("price", "left", color)} `}>
          <AnimationBottomBorder compareValue={priceDisplay}>
            {priceDisplay}
          </AnimationBottomBorder>
        </div>
        <div
          className={cx("price", "right", "up-down-diff", color)}
          style={{ textAlign: "right" }}
        >
          {upDown && upDown !== 0 ? (
            <FontAwesomeIcon
              icon={faCaretUp}
              className={cx(upDown < 0 && "down")}
            />
          ) : (
            ""
          )}
          <div className={cx("upDownDisplay")}>
            <AnimationBottomBorder compareValue={upDownDisplay}>
              {upDown === 0 ? "--" : upDownDisplay}
            </AnimationBottomBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnimationBottomBorderProps {
  compareValue: any;
}

const AnimationBottomBorder: React.FC<
  AnimationBottomBorderProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ compareValue, className = "", children, ...rest }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useUpdateEffect(() => {
    anime({
      targets: ref.current,
      opacity: [
        { value: 1, duration: 200 },
        { value: 0, duration: 200 },
      ],
      easing: "linear",
    });
  }, [compareValue]);
  return (
    <div className={cx("animate-wrap")}>
      <div
        className={[cx("animate-bottom-border"), className].join(" ")}
        {...rest}
      >
        <div>{children}</div>
        <div ref={ref} className={cx("border")}></div>
      </div>
    </div>
  );
};
export default QuoteInfo;
