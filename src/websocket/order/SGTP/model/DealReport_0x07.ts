import { MessageBase } from './BaseMessage';

/** 成交回報 */
export interface DealReport extends MessageBase {
  /** 功能代碼 (0x07 成交回報) */
  fcode: '7';
  /** 成交回報資訊  */
  fill: DealFill[];
}

/** 成交回報資訊 */
interface DealFill {
  /** 成交商品別
   * - 'futures': 期貨
   * - 'option': 期貨選擇權
   */
  type: 'futures' | 'option';
  /** 市場別
   * - 'O': 國外
   * - 'I': 國內
   */
  mtype: 'O' | 'I';
  /** 公司碼 */
  firm: string;
  /** 下單帳號 */
  actno: string;
  /** 成交單號*/
  trdno: string;
  /** 網路單號 */
  seqno: string;
  /** 委託單號 */
  ordno: string;
  /** 交易日期
   * - 格式: YYYY/MM/DD
   */
  orddt: string;
  /** 委託時間
   * - 格式: YYYY/MM/DD HH:mm:ss
   */
  /** 商品代碼
   *
   * 依精誠報價代碼
   */
  comno: string;
  /** 報價代號 */
  dqcomno: string;
  /** 商品中文 */
  comname: string;
  /** 商品年月
   * - 格式: YYYYMM
   */
  comym: string;
  /** 成交時間
   * - 格式: YYYY/MM/DD HH:MM:SS
   */
  filltime: string;
  /** 此次成交口數 */
  fillqty: string;
  /** 買賣別
   * - 'B': 買
   * - 'S': 賣
   */
  ps: 'B' | 'S';
  /** 交易所代號 */
  exh: string;

  p1: string;
  /** 成交價格分數制
   * - 預設值 0
   */
  p2: string;
  /** 成交價格價格分母
   * - 預設值 0
   */
  p3: string;
  /** 成交價十進位制
   * - 預設值 0
   */
  op: string;
  /** 營業員 */
  ae: string;
  /** 下單來源 */
  srctype: string;
  /** 履約價
   * - 預設值: 0
   */
  stkprc: string;
  /** Callput
   * - 預設值: 'N'
   */
  callput: string;
  /** 該委託之盤別
   *
   * 	永豐需求欄位
   */
  bosordknd: string;

  /** 上手單號 */
  exh_number: string;

  /** 腳號
   *
   * 大於0即為多腳位單，數字即為腳號
   */
  legno: string;
  /** 客戶端識別序號 */
  client_seq: string;

  /** 盤別
   * - 'R': 日盤
   * - 'P': 夜盤
   */
  etype: string;

  /** 單複式單
   * - '0': 單式單
   * - '1': 複式單
   */
  itype: '0' | '1';

  /** 新平倉碼
   * - 'Y': 新倉，
   * - 'N': 平倉
   */
  open: 'Y' | 'N';
}
