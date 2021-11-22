import { QueryMessageBase } from './BaseMessage';

/** 出入金查詢回應 */
export interface QueryDepositAndWithdrawResponse extends QueryMessageBase {
  /** 功能代碼 (0x36) */
  fcode: '54';
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  errorCode: string;
  /** 錯誤訊息 */
  errorText: string;
  deposit: DepositAndWithdrawInfo[];
}

/** 出入金查詢資訊 */
interface DepositAndWithdrawInfo {
  /** 市場別
   * - 'I': 國內
   */
  mtype: string;
  /** 前台單號 */
  seqno: string;
  /** 異動別
   * - '1': 出金申請
   * - '2': 取消
   */
  type: string;
  /** 存提類別
   * - '1': 存
   * - '2': 提
   */
  cdtype: string;
  /** 後台單號 */
  slipno: string;
  /** 來源幣別 */
  currency: string;
  /** 金額 */
  orignamt: string;
  /** 目的幣別 */
  tocurrency: string;
  /** 目的金額 */
  toamt: string;
  /** 目的市場別
   * - 'I': 國內
   */
  tomtype: string;
  /** 目的後台單號 */
  toslipno: string;
  /** 目的存提類別
   * - '1': 存
   * - '2': 提
   */
  tocdtype: '1' | '2';
  /** 委託日期
   * - 格式: YYYY/MM/DD
   */
  orddt: string;
  /** 委託時間
   * - 格式: HH:MM:SS
   */
  ordtm: string;
  /** 存提款日期
   * - 格式: YYYY/MM/DD
   */
  trddt: string;
  /** 目的存提款日期 */
  totrddt: string;
  /** 台幣金額 */
  ntamt: string;
  /** 存款銀行 */
  bank: string;
  /** 存款銀行名稱 */
  banknm: string;
  /** 存款帳號 */
  bankactno: string;
  /** 存款銀行戶名 */
  bankactnm: string;
  /** 提款銀行 */
  tobank: string;
  /** 解款銀行名稱 */
  tobanknm: string;
  /** 提款帳號 */
  tobankactno: string;
  /** 解款銀行戶名 */
  tobankactnm: string;
  /** 資料更新日期 */
  updt: string;
  /** 資料更新時間 */
  uptime: string;
  /** 查詢時間 */
  qrytm: string;
  /** 結案別
   * - 'Y': 結案
   * - 'N': 未結案
   */
  closetrd: 'Y' | 'N' | '';
  /** 訊息 */
  status: string;
  /** 狀態碼 */
  code: string;
}
