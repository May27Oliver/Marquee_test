import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useMarqueeDispatchContext } from "context/MarqueeConfig";
import { useHistory } from "react-router-dom";
import ImportSetting from "container/ImportSetting";
import ManageSetting from "container/ManageSetting";
import ConfigSetting from "container/ConfigSetting";
import { useLoginStateContext } from "context/loginContext";
const cx = classNames.bind(styles);

interface settingType {
  closeModal: () => void;
}

const SettingPage: React.FC<settingType> = () => {
  const [type, setType] = React.useState<"import" | "manage" | "config">(
    "manage"
  );

  const history = useHistory();
  const { login } = useLoginStateContext();
  if (!login) {
    history.push("/login");
  }
  return (
    <div className={cx("setting-page-wrap")}>
      <div className={cx("setting-page")}>
        <div className={cx("setting-header")}>
          <div className={cx("setting-title")}>跑馬燈設定</div>
          <div
            className={cx("setting-close")}
            onClick={() => {
              history.push("/marquee");
            }}
          ></div>
        </div>
        <div className={cx("setting-content")}>
          <div className={cx("tab-wrap")}>
            <div
              className={cx(
                "tab-option",
                type === "manage" ? "tab-select" : ""
              )}
              onClick={() => setType("manage")}
            >
              管理群組
            </div>
            <div
              className={cx(
                "tab-option",
                type === "import" ? "tab-select" : ""
              )}
              onClick={() => setType("import")}
            >
              匯入群組
            </div>
            <div
              className={cx(
                "tab-option",
                type === "config" ? "tab-select" : ""
              )}
              onClick={() => setType("config")}
            >
              參數設定
            </div>
          </div>
          {/* 匯入群組 */}
          {type === "import" && <ImportSetting />}
          {/* 管理群組 */}
          {type === "manage" && <ManageSetting />}
          {/* 參數管理 */}
          {type === "config" && <ConfigSetting />}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
