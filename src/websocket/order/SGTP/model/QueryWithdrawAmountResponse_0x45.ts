import { QueryMessageBase } from './BaseMessage';

/** 可出金額回應 */
export interface QueryWithdrawableAmountResponse extends QueryMessageBase {
  /** 功能代碼 (0x45) */
  fcode: '69';
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /**  幣別
   * - 'NTT'
   * - 'NTD'
   * - 'UST'
   * - 'USD'
   * - 'JPY'
   */
  currency: string;
  /** 幣別中文 */
  currnm: string;
  /** 可出金額 */
  amt: string;
  /** 錯誤代碼
   * - '0000': 正常
   */
  errorCode: string;
  /** 錯誤訊息 */
  errorText: string;
  /** 中台流水號 */
  MOBSVSerial: string;
}
