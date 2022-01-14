import axios, { AxiosInstance } from "axios";

import { getEnv } from "tools/getEnv";
import * as quote from "./Quote";
import * as marquee from "./MarqueeConf";

class Api {
  constructor(private tokenInvalidAction: () => void = () => {}) {
    this.axios = axios.create({
      baseURL: getEnv("QUOTE_SLAVE_URL"),
      validateStatus: (status) => status === 200,
    });
    //MARQUEE_KGI_URL
    //LOCAL_TEST
    this.axiosMarquee = axios.create({
      baseURL: getEnv("MARQUEE_KGI_URL"),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus: (status) => status === 200,
    });

    this.setAxiosInterceptors();
  }

  private axios: AxiosInstance;
  private axiosMarquee: AxiosInstance;

  private setAxiosInterceptors = () => {
    this.setAxiosInterceptorsForRequest();
    this.setAxiosInterceptorForResponse();
  };

  private setAxiosInterceptorsForRequest = () => {
    this.axios.interceptors.request.use(
      (config) => {
        console.log(
          `Send request to url:${config.baseURL}${config.url} using method: %c${config.method}\n`,
          "background:#D6EAF8;color:#E74C3C;padding:0px 5px;"
        );
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  };

  private setAxiosInterceptorForResponse = () => {
    this.axios.interceptors.response.use(
      (response) => {
        console.log(
          `Get response from url: ${response.config.url}, Status code: ${response.status}\n`,
          response.data
        );

        if (response.data?.ReturnCode === -2) {
          this.tokenInvalidAction();
          return Promise.reject();
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  //#region Apex

  getQuotes = async (parameters: quote.GetQuotesParameter) => {
    return quote.getQuotes(this.axios, parameters);
  };

  getKLines = async (parameters: quote.GetKLinesParameters) => {
    return quote.getKLines(this.axios, parameters);
  };

  getHistory = async (parameters: quote.GetHistoryParameters) => {
    return quote.getHistory(this.axios, parameters);
  };

  registerTick = async (parameters: quote.RegisterParameters) => {
    return quote.register(this.axios, parameters);
  };

  //取得該播放哪個群組資料
  getGroupNames = async () => {
    return marquee.queryGroupName(this.axiosMarquee);
  };

  //取得群組所有股票
  getSymbols = async (groupId: number) => {
    return marquee.querySymbols(this.axiosMarquee, groupId);
  };

  //個別群組增加股票
  addSymbols = async (groupno: number, symbol: marquee.SymbolType) => {
    return marquee.addSymbols(this.axiosMarquee, groupno, symbol);
  };

  //匯入csv
  importSymbols = async (groupno: number, importList: marquee.SymbolType[]) => {
    return marquee.importSymbols(this.axiosMarquee, groupno, importList);
  };

  //調整播放群組
  updateGroupNo = async (groupno: number) => {
    return marquee.updateGroupNo(this.axiosMarquee, groupno);
  };

  //取得速度
  querySpeed = async () => {
    return marquee.querySpeed(this.axiosMarquee);
  };
  //調整速度
  updateSpeed = async (groupno: number) => {
    return marquee.updateSpeed(this.axiosMarquee, groupno);
  };

  //刪除symbol
  deleteSymbol = async (groupno: number, symbol: marquee.SymbolType) => {
    return marquee.deleteSymbol(this.axiosMarquee, groupno, symbol);
  };

  getMarqueeSymbols = async () => {
    return marquee.getMarqueeSymbols(this.axiosMarquee);
  };
  //login
  login = async (acc: string, pass: string) => {
    return marquee.login(this.axiosMarquee, acc, pass);
  };
  //verify login
  verifyLogin = async (sessionId: string) => {
    return marquee.verifyLogin(this.axiosMarquee, sessionId);
  };
  //get direction
  getDirection = async () => {
    return marquee.getDirection(this.axiosMarquee);
  };
  //調整方向
  updateDirection = async (direction: number) => {
    return marquee.updateDirection(this.axiosMarquee, direction);
  };
}

export default new Api();
