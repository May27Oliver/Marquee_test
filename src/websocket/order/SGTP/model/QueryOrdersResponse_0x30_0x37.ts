import type { QueryMessageBase } from './BaseMessage';

/** 委託回報回應 (今日/歷史共用) */
interface QueryOrdersResponse extends QueryMessageBase {
  /**
   * FCode
   * - '48': 今日(0x30)
   * - '57': 歷史(0x37)
   */
  fcode: '48' | '55';
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /** 查詢序號 */
  sno: string;
  /** 狀態碼 */
  code: string;
  /** 委託回報功能基礎元素 */
  reply: OrderReply[];
  /** 錯誤訊息 */
  errorText: string;
}

/** 委託回報 */
interface OrderReply {
  /** 錯誤訊息 */
  text: string;
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /** 前台流水號 */
  seqno: string;
  /** 委託單單號 */
  ordno: string;
  /** 市場別
   * - 'I': 國內
   * - 'O'： 國外
   */
  mtype: 'I' | 'O';
  /** 盤別
   * - 'R': 日盤
   * - 'P': 夜盤
   */
  etype: 'R' | 'P';
  /** 期交所
   *
   * 固定為 "TIM"(台灣交易所)
   */
  exhno: string;
  /** 商品代號 */
  comno: string;
  /** 幣別 */
  currency: string;
  /** 上手代碼
   *
   * 固定為 "TIM"(台灣交易所)
   */
  abdealer: string;
  /** 下單方式
   *
   * 固定為 "TIM"(台灣交易所)
   */
  solution: string;
  /** 交易日期
   * - 格式: YYYY/MM/DD
   */
  orddt: string;
  /** 下單日期時間
   * - 格式: YYYY/MM/DD HH:MM:SS
   */
  ordtm: string;
  /** 記錄時間
   * - 格式: YYYY/MM/DD HH:MM:SS
   */
  logdt: string;
  /** 下單人 */
  operator: string;
  /** 下單人分公司碼 */
  branchno: string;
  /** 營業員 */
  aeno: string;
  /** 委託指令
   * - '0': 新單
   * - '1': 刪單
   * - '2': 改單
   * - '3': 追單
   * - '6': 退單
   */
  cmd: '0' | '1' | '2' | '3' | '6';
  /** 委託來源 */
  srctype: string;
  /** 商品種類
   * - 'futures': 期貨
   * - 'option': 選擇權 */
  comtype: 'futures' | 'option';
  /** 回報時間
   * - 格式: HH:MM:SS */
  rectime: string;
  /** 主機序號 */
  cnt: string;
  /** 畫面訊息編號 */
  clientseq: string;
  /** 狀態代碼
   * - '0000': 表示成功
   */
  code: string;
  /** 結案別 */
  closetrd: string;
  /**	狀態
   * - 刪單中
   * - 刪單成功
   * - 刪單失敗
   * - 減量中
   * - 減量成功
   * - 減量失敗
   * - 改價中
   * - 改價成功
   * - 改價失敗
   * - 完全成交
   * - 部份成交
   * - 委託中
   * - 已取消
   * - 委託失敗
   * - 傳送中
   * - 委託成功
   * - 異常單
   * - 預約單
   */
  status: string;
  /** 最後狀態
   * - "": 新單委託成功
   * -'C': 刪單委託成功
   * -'U': 改量成功
   * -'F': 成交
   * -'其他': 如有錯誤直接把錯誤訊息壓在這一欄
   */
  statustext: string;
  /**	交易所序號 */
  exhordsn: string;
  /**	委託別
   * - LMT
   * - MKT
   * - MKP
   */
  ordtype: 'LMT' | 'MKT' | 'MKP';
  /**	委託方式
   * - ROD
   * - FOK
   * - IOC
   */
  effknd: 'ROD' | 'FOK' | 'IOC';
  /**	下單口數 */
  ordqty: string;
  /**	成交口數 */
  trdqty: string;
  /**	刪單口數 */
  calqty: string;
  /**	有效口數 */
  remqty: string;
  /**	當沖
   * - 'Y': 當沖
   * - 'N': 非當沖
   */
  dtrade: 'Y' | 'N';
  /** 委託價十進位制 */
  ordprice1: string;
  /** 委託價分數制 */
  ordprice2: string;
  /** 委託價價格分母 */
  ordprice3: string;
  /** 停損價十進位制 */
  triprice1: string;
  /** 停損價分數制 */
  triprice2: string;
  /** 停損價價格分母 */
  triprice3: string;
  /** 新平碼
   * - 'Y': 新倉
   * - 'N': 平倉
   */
  open: 'Y' | 'N';
  /** 錯誤訊息 */
  errormsg: string;
  /** 腳位基礎元素 */
  leg: OrderReplyLeg[];
}

/** 委託回報功能基礎之元素腳位元素 */
interface OrderReplyLeg {
  /** 腳位 */
  no: string;
  /** 市場別
   * - 'I': 國內
   */
  mtype: 'I';
  /** 盤別
   * - 'R': 日盤
   * - 'P': 夜盤
   */
  etype: 'R' | 'P';
  /** 交易所
   *
   * 固定為 "TIM"(台灣交易所)
   */
  exhno: string;
  /** 報價代號 */
  dqcomno: string;
  /** 商品中文 */
  comname: string;
  /** 幣別
   * - 'NTT': 台幣
   * - 'CNY': 人民幣
   * - 'USD': 美元
   * - 'JPY': 日幣
   */
  currency: 'NTT' | 'CNY' | 'USD' | 'JPY';
  /** 契約月份
   * - 格式 [YYYYMM]
   */
  comym: string;
  /** 履約價 */
  stkprc: string;
  /** 買賣權
   * - 'C': 買權
   * - 'P': 賣權
   * - 'N' | ' ': 期貨
   */
  callput: 'C' | 'P' | 'N' | ' ';
  /** 買賣別
   * - 'B': 買
   * - 'S': 賣 */
  ps: 'B' | 'S';
  /** 上手代碼
   *
   * 固定為 "TIM"(台灣交易所)
   */
  abdealer: string;
  /** 下單方式
   *
   * 固定為 "TIM"(台灣交易所)
   */
  solution: string;
}

/** 今日委託回報 */
export interface QueryTodaysOrdersResponse extends QueryOrdersResponse {
  /** 功能代碼 (0x30) */
  fcode: '48';
}

/** 歷史委託回報 */
export interface QueryHistoryOrdersResponse extends QueryOrdersResponse {
  /** 功能代碼 (0x37) */
  fcode: '55';
}
