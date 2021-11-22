import { QueryMessageBase } from './BaseMessage';

/** 出金申請與取消回應 */
export interface WithdrawRequestResponse extends QueryMessageBase {
  /** 功能代碼 (0x44) */
  fcode: '68';
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /** 後台單號
   * - 對應出入金查詢 tag: slipno
   */
  dseq: string;
  /** 錯誤代碼
   * - '0000': 正常
   */
  errorCode: string;
  /** 錯誤訊息 */
  errorText: string;
  /** 中台流水號 */
  MOBSVSerial: string;
}
