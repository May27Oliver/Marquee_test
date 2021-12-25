import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosPromise,
} from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    head<T = any>(url: sstring, config?: AxiosRequestConfig): AxiosPromise<T>;
  }
}
