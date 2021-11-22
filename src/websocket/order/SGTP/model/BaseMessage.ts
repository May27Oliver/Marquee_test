/** SGTP 訊息基本資訊 */
export interface MessageBase {
  /** 功能代碼 */
  fcode: string;
}

/** SGTP 查詢回應基本資訊 */
export interface QueryMessageBase extends MessageBase {
  /** Client request 時所帶之 sno */
  sno: string;
}
