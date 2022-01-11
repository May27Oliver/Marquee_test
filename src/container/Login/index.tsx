import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import api from "api";
import { useHistory } from "react-router-dom";
import { useLoginDispatchContext } from "context/loginContext";

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const dispatch = useLoginDispatchContext();
  const [account, setAccount] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  let history = useHistory();

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <div className={cx("login-page-wrap")}>
      <div className={cx("login-page")}>
        <div className={cx("login-header")}>
          <div className={cx("login-title")}>Login</div>
        </div>
        <div className={cx("login-content")}>
          <div className={cx("login-text-field-title")}>帳號：</div>
          <div className={cx("login-text-field-column")}>
            <input
              type="text"
              value={account}
              className={cx("login-input")}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            />
          </div>
          <div className={cx("login-text-field-title")}>密碼：</div>
          <div className={cx("login-text-field-column")}>
            <input
              type="password"
              value={password}
              className={cx("login-input")}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {/* <div
            className={cx("login-text-field-title", "forgot-password")}
            onClick={() => {
              setError("帳號：kgi 密碼：kgi2330");
            }}
          >
            忘記密碼？
          </div> */}
          <div className={cx("login-text-field-title", "error-msg")}>
            {error}
          </div>
        </div>
        <div className={cx("button-panel")}>
          <button
            className={cx("submit-button")}
            onClick={() => {
              (async () => {
                if (!account || !password) {
                  setError("帳號密碼不得為空");
                  return;
                }
                const res = await api.login(account, password);
                console.log("login res", res);
                if (!res.result) {
                  const { message } = res;
                  setError(message);
                  return;
                } else {
                  dispatch({ type: "SET_LOGIN", payload: true });
                  history.push("/marquee");
                }
              })();
            }}
          >
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
