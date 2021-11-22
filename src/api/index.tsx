import axios, { AxiosInstance } from 'axios';

import { getEnv } from 'tools/getEnv';
import * as quote from './Quote';

class Api {
  constructor(
    private clientOrderIdPrefix: string = '',
    private tokenInvalidAction: () => void = () => {},
  ) {
    this.axios = axios.create({
      baseURL: getEnv('QUOTE_MASTER_URL'),
      validateStatus: (status) => status === 200,
    });

    this.setAxiosInterceptors();
  }

  private axios: AxiosInstance;

  private setAxiosInterceptors = () => {
    this.setAxiosInterceptorsForRequest();
    this.setAxiosInterceptorForResponse();
  };

  private setAxiosInterceptorsForRequest = () => {
    this.axios.interceptors.request.use(
      (config) => {
        console.log(
          `Send request to url:${config.baseURL}${config.url} using method: %c${config.method}\n`,
          'background:#D6EAF8;color:#E74C3C;padding:0px 5px;',
        );
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  };

  private setAxiosInterceptorForResponse = () => {
    this.axios.interceptors.response.use(
      (response) => {
        console.log(
          `Get response from url: ${response.config.url}, Status code: ${response.status}\n`,
          response.data,
        );

        if (response.data?.ReturnCode === -2) {
          this.tokenInvalidAction();
          return Promise.reject();
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
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
}

export default new Api();
