import { MessageBase } from './BaseMessage';

/** 委託回報 */
export interface OrderReport extends MessageBase {
  /** 功能代碼 (0x06) */
  fcode: '6';
  /** 虛擬分公司 A001(好神通用) */
  vbhno: string;
  /** 虛擬帳號 000001(好神通用) */
  vcseq: string;
  /** 委託回報資訊  */
  reply: OrderReply[];
}

/** 委託回報資訊 */
interface OrderReply {
  /** 回報商品別
   * - 'futures': 期貨
   * - 'option': 期貨選擇權
   */
  type: 'futures' | 'option';
  /** 執行指令
   * '0': 新單
   * '1': 刪單
   * '2': 改單
   * '3': 追單(改價)
   * '6': 退單
   */
  cmd: '0' | '1' | '2' | '3' | '6';
  /** 單複式單
   * - '0': 單式單
   * - '1': 複式單
   */
  itype: '0' | '1';
  /** 市場別
   * - 'O': 國外
   * - 'I': 國內
   */
  mtype: 'O' | 'I';
  /** 公司碼 */
  firm: string;
  /** 下單帳號 */
  actno: string;
  /** 委託書號 */
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
  ordtm: string;
  /** 商品代碼
   *
   * 依SGTP2.1商品檔設定
   */
  comno: string;
  /** 商品年月
   * - 格式: YYYYMM
   */
  comym: string;
  /** 報價代號 */
  dqcomno: string;
  /** 商品中文 */
  comname: string;
  /** 委託單別
   * - 'LMT'
   * - 'MKT'
   * - 'STP'
   * - 'SWL'
   */
  ordtype: 'LMT' | 'MKT' | 'MKP';
  /** 委託類型
   * - 'ROD': 當日有效 (Rest of Day)
   * - 'IOC': 立即成交否則取消 (Immediate-or-Cancel)
   * - 'FOK': 立即全部成交否則取消 (Fill-or-Kill)
   */
  effknd: 'ROD' | 'IOC' | 'FOK';
  /** 委託口數 */
  ordqty: string;
  /** 買賣別
   * - 'B': 買
   * - 'S': 賣 */
  ps: 'B' | 'S';
  /** 交易所代號 */
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
  /** 新單(原始價格)，改價單(前次價格)價格十進位制
   *
   * - 預設值 0
   * - Server 內部使用
   */
  prep1: string;
  /** 新單(原始價格)，改價單(前次價格)價格分數制
   * - 預設值 0
   * - Server 內部使用
   */
  prep2: string;
  /** 新單(原始價格)，改價單(前次價格)價格價格分母
   * - 預設值 0
   * - Server 內部使用
   */
  prep3: string;
  /** 下單操作者 */
  op: string;
  /** 營業員 */
  ae: string;
  /** 委託單操作累計次數 */
  cnt: string;
  /** 下單來源 */
  srctype: string;
  /** 狀態碼 */
  code: string;
  /** 客戶端識別序號 */
  client_seq: string;
  /** 訊息
   *
   * 	回報相關訊息，包含錯誤訊息或其他正常傳達訊息
   */
  text: string;
  /** 履約價
   * - 預設值: 0
   */
  stkprc: string;
  /** 買賣權
   * - 'C': 買權
   * - 'P': 賣權
   * - 'N' | ' ': 期貨
   */
  callput: 'N' | 'P' | 'C' | ' ';
  /** 是否要當沖 */
  dtrade: 'Y' | 'N';
  /** 新平倉碼
   * - 'Y': 新倉，
   * - 'N': 平倉
   */
  open: 'Y' | 'N';
  /** 原委託口數 */
  ori_qty: string;
  /** 累計刪除口數 */
  cxl_qty: string;
  /** 累計成交口數 */
  cum_fill_qty: string;
  /** 該委託之盤別
   *
   * 	永豐需求欄Server 內部使用
   */
  bosordknd: string;
  /** 上手單號 */
  exh_number: string;
  /** 腳號
   *
   * 大於0即為多腳位單，數字即為腳號
   */
  legno: string;
  /** 是否為預約單
   * - 'Y': 目前為預約單
   * - 'N': 盤中單
   */
  reserve: 'Y' | 'N';
  /** 盤別
   * - 'R': 日盤
   * - 'P': 夜盤
   */
  etype: 'R' | 'P';
  iType: '0';
}
