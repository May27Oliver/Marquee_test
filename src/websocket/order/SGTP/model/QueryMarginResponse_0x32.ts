import { QueryMessageBase } from './BaseMessage';

/** 國內期貨保證金回應資訊 */
export interface QueryMarginResponse extends QueryMessageBase {
  /** 功能代碼 (0x32) */
  fcode: '50';
  /** dfut_marginrtn  */
  xmltype: string;
  /** 帳號 */
  actno: string;
  /** 分公司 */
  company: string;
  /** 保證金基礎元素 */
  margin: MarginInfo[];
  /** 狀態碼 */
  code: string;
  /** 錯誤訊息 */
  errorText: string;
  /** 中台用流水號 */
  MOBSVSerial: string;
}

/** 保證金基礎元素 */
interface MarginInfo {
  /**市場別 */
  mtype: string;
  /**客戶帳號 */
  actno: string;
  /**分公司碼 */
  company: string;
  /** 幣別
   * - NTD: 台幣
   * - CNY: 人民幣
   * - USD: 美金
   * - JPY: 日幣
   */
  currency: 'NTD' | 'CNY' | 'USD' | 'JPY';
  /** 匯率 */
  exrate: string;
  /** 最後資料更新時間 */
  caltime: string;
  /** 昨日帳戶權益數 */
  ctdab: string;
  /** 本日出入金 */
  dwamt: string;
  /** 本日平倉損益 */
  osprtlos: string;
  /** 手續費 */
  fee: string;
  /** 營業稅
   * - 國外: 營業稅
   * - 國內: 期交稅
   */
  amt: string;
  /** 權利金支出/收入 */
  premium: string;
  /** 買方委託預扣權利金 */
  iopremium: string;
  /** 買方權利金市 */
  bpremium: string;
  /** 賣方權利金市值 */
  spremium: string;
  /** 未平倉浮動損益 */
  prtlos: string;
  /** 下單可用保證金 */
  tmexcess: string;
  /** 所需維持保證金 */
  tmmamt: string;
  /** 期權市值 */
  optequity: string;
  /** 權益總值 */
  mktval: string;
  /** 台幣權益總值 */
  nt_opt_equity: string;
  /**  原始保證金 */
  tmiamt: string;
  /** 維持率 */
  matnRate: string;
  /** 權益數 */
  val: string;
  /**  (NT-比率A)
   * - 國外: (NT-比率A)
   * - 國內: 原始比率
   */
  ntrate_a: string;
  /** 台幣維持率(NT-比率B)
   * - 國外: (NT-比率B)
   * - 國內: 清算比率
   */
  ntrate_b: string;
  /** 追繳金額 */
  adamt: string;
  /** 選擇權未平倉損益 */
  obgain: string;
  /** 選擇權權利金市值  */
  apamt: string;
  /** 風險係數 */
  warnn: string;
  /** 有價品類 */
  xdgamt: string;
  /** 抵繳金額 */
  gdamt: string;
  otamt: string;
  /** 本日帳戶餘額 */
  cashamt: string;
  /** 加收保證金指標 */
  axps: string;
  /** 加收保證金 */
  axamt: string;
  /** 選擇權平倉損益 */
  orlpl: string;
  /** 期貨浮動損益 */
  munet: string;
  /** 浮動風險 */
  risk: string;
  /** 匯率提供*/
  rateoffer: string;
}
