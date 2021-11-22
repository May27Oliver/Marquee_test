import { QueryMessageBase } from './BaseMessage';

/** 未平倉回應 */
export interface QueryOpenInterestResponse extends QueryMessageBase {
  /** 功能代碼 (0x33) */
  fcode: '51';
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /** 未平倉基礎元素 */
  position: OpenPositionInfo[];
}

/** 未平倉資訊 */
interface OpenPositionInfo {
  /** 客戶帳號 */
  actno: string;
  /** 分公司碼 */
  company: string;
  /** 委託單單號
   * - 未平倉彙總不會有此欄位
   * */
  seqno?: string;
  /** 成交帳務日期 */
  trddt: string;
  /** 平倉口數 */
  qty: string;
  /** 商品種類 */
  comtype: string;
  /** 原始保證金 */
  iamt: string;
  /** 維持保證金 */
  mamt: string;
  /** 單複式
   * - '1': 複式價差
   * - '2': 複式跨月
   * - '3': 複式跨式
   * - '4': 複式勒式
   * - '5': 複式逆轉
   * - 'N': 單式
   */
  spread: string;
  leg: OpenPositionLegInfo[];
}

/** 未平倉腳位資訊 */
interface OpenPositionLegInfo {
  /** 市場別 */
  mtype: string;
  /** 交易所代號 */
  exhno: string;
  /** 幣別 */
  currency: string;
  /** 委託單單號
   * - 未平倉彙總不會有此欄位
   *  */
  ordno?: string;
  /** 成交單號
   * - for 中菲後台
   */
  trdno: string;
  /** 拆單序號
   * - for 中菲後台
   */
  splitno: string;
  /** 成交日期
   * - for 中菲後台 (此欄位須放在leg內)
   */
  trddt: string;
  /** 商品代號 */
  comno: string;
  /** */
  dqcomno: string;
  /** */
  comname: string;
  /** 契約月份 */
  comym: string;
  /** 履約價(選擇權的必要欄位) */
  stkprc: string;
  /** 買賣權(選擇權的必要欄位) */
  callput: string;
  /** 買賣別 */
  ps: string;
  /** 未平倉損益 */
  prtlos: string;
  /** 結算價十進位制 */
  trdpre1: string;
  /** 結算價分數制 */
  trdpre2: string;
  /** 價格分母 */
  trdpre3: string;
  /** 市價十進位制 */
  mktpre1: string;
  /** 市價分數制 */
  mktpre2: string;
  /** 價格分母 */
  mktpre3: string;
  /** 成交價十進位制 */
  trdprc1: string;
  /** 成交價分數制 */
  trdprc2: string;
  /** 價格分母 */
  trdprc3: string;
}
