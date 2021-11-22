import { MessageBase } from './BaseMessage';

export interface OrderReply extends MessageBase {
  /** 市場別
   * - 'I': 國內
   * - 'O': 國外
   * */
  mtype: string;
  /** 功能代碼 0x05 委託收到 */
  fcode: '5';
  /** 虛擬分公司 */
  vbhno: string;
  /** 虛擬帳號 */
  vcseq: string;
  /** 錯誤代碼
   *
   * GW用, 有錯誤才會出現
   * */
  code: string;
  /** 錯誤訊息
   *
   * GW用, 有錯誤才會出現
   * */
  errorText: string;
  /** 一份下單回傳的基礎標籤 */
  reply: Reply[];
}

interface Reply {
  /** 分公司 */
  firm: string;
  /** 帳號 */
  actno: string;
  /** 委託日 */
  orddt: string;
  /** 委託時間 */
  ordtm: string;
  /** 報價代號 */
  dqcomno: string;
  /** 商品中文 */
  comname: string;
  /** 委託單別
   * - LMT
   * - MKT
   * - STP
   * - SWL
   * */
  ordtype: string;
  /** 哪一個平台回覆 */
  replyfrom: string;
  /** 是否為預約單
   * - 'Y': 目前為預約單
   * - 'N': 盤中單
   * */
  reserve: string;
  /** 由客戶端所編的序號
   *
   *  客戶端有帶才回傳
   * */
  client_seq: string;
  /** 委託書號 */
  ordno: string;
  /** 分單號 */
  cnt: string;
  /** 網路書號 */
  seqno: string;
  /** 商品代碼 */
  comno: string;
  /** 商品月份 */
  comym: string;
  /** 委託口數 */
  ordqty: string;
  /** 交易所 */
  exh: string;
  /** 限價價格十進位制
   * - 預設值 0
   */
  p1: string;
  /** 限價價格分數制
   * - 預設值 0
   */
  p2: string;
  /** 停損價格價格分母
   * - 預設值 0
   */
  p3: string;
  /** 停損價格十進位制
   * - 預設值 0
   */
  p4: string;
  /** 停損價格分數制
   * - 預設值 0
   */
  p5: string;
  /** 停損價格價格分母
   * - 預設值 0
   */
  p6: string;
  /** 履約價 */
  stkprc: string;
  /** 買賣權 */
  callput: string;
  /** 原口數 */
  ori_qty: string;
  /** 刪除口數 */
  cxl_qty: string;
  /** 成交口數 */
  cum_fill_qty: string;
  /** 錯誤代碼
   * - '0000': 成功
   * - '8023': 預約單
   * - '0999': 委託中
   * */
  code: string;
  /** 錯誤說明
   *
   * code的中文說明 */
  text: string;
  /** 中台流水號 */
  MOBSVSerial: string;
}
