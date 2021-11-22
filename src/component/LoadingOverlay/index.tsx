import React from "react";
import classNames from "classnames/bind";
import { Overlay } from "component/Modal";
import { Loading } from "component/Icons";

import styles from "./index.module.css";

const cx = classNames.bind(styles);

interface LoadingOverlayProps {
  isOpen: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isOpen }) => {
  return (
    <Overlay
      isOpen={isOpen}
      //Just for clear the default style
      className={"loading-overlay-container"}
      overlayClassName={cx("modal-overlay")}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Loading />
    </Overlay>
  );
};

export default LoadingOverlay;
