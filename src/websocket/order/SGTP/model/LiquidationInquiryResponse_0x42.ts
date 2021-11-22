import { QueryMessageBase } from './BaseMessage';

/** 沖銷明細查詢回應 */
export interface LiquidationInquiryResponse extends QueryMessageBase {
  /** 功能代碼 (0x42) */
  fcode: '66';
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /** 中台用流水號 MOBSVSerial */
  MOBSVSerial: string;
  /** 平倉基礎元素 */
  offset: OffsetInfo[];
}

/** 沖銷明細資訊 */
interface OffsetInfo {
  /** 平倉交易日 */
  ostrddt: string;
  /** 平倉報告書號 */
  osordno: string;
  /** 平倉口數 */
  osqty: string;
  /** 平倉成交價格 */
  rprice: string;
  /** 新倉交易日
   * - 格式: YYYY/MM/DD
   */
  trddt: string;
  /** 新倉報告書號 */
  ordno: string;
  /** 新倉口數
   * - tflag=3時放棄, qty代表放棄數
   */
  qty: string;
  /** 新倉成交價格 */
  price: string;
  /** 商品代碼 */
  comno: string;
  /** 商品中文名 */
  cname: string;
  /** 契約年月 */
  comym: string;
  /** 期權別
   * - 'C': 買權
   * - 'P': 賣權
   * - 'N' | '' : 期貨
   */
  callput: 'C' | 'P' | '' | 'N';
  /** 履約價 */
  stkprice: string;
  /** 新倉買賣別
   * - 'B': 買
   * - 'S': 賣
   */
  side: 'B' | 'S';
  /** 平倉損益 */
  osprtlos: string;
  /** 幣別 */
  currency: string;
  /** 交易所 */
  exh: string;
  /** 交割別
   * - 歷史查詢才有此tag
   * - '1': 交易產生
   * - '2': 交割(到期)產生
   * - '3': 放棄
   */
  tflag: string;
  /** 履約交割手續費 */
  fee: string;
  /** 履約交易 */
  tax: string;
}
