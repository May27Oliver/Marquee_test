export interface Quote {
  Symbol: string;
  Name: string | null;
  NameSlave: string | null;
  Exchange: string;
  AskPrice: number | null;
  AskVolume: number | null;
  BidPrice: number | null;
  BidVolume: number | null;
  Open: number | null;
  Price: number | null;
  TotalVolume: number | null;
  TradeStat: string | null;
  TradeStatCode: string | null;
  UpDown: number | null;
  UpDownRate: number | null;
  High: number | null;
  Low: number | null;
  PriceDec: number | null;
  StrikeDec: number | null;
  HighLimitPrice: number | null;
  LowLimitPrice: number | null;
  BuyCount: number | null;
  SellCount: number | null;
  DealType: string | null;
  StaBidOrder: string | null;
  StaBidVolume: string | null;
  StaAskOrder: string | null;
  StaAskVol: string | null;
  NowPrice: string | null;
  /**
   * 未平倉量
   */
  OpenInterest: number | null;
  StockCode: string | null;
  ProdType: string | null;
  lastCoverTickTime: Date | null;
  Volume: string | null;
  StrikePrice: string | null;
  PutOrCall: string | null;
  FBidPrice: number | null;
  FBidVol: string | null;
  FAskPrice: number | null;
  FAskVol: string | null;
  PrePrice: number | null;
  OpenTime: Date;
  CloseTime: Date;
  SymbolDate: string | null;
  PreVolume: string | null;
  Bids: { Price: number; Volume: number }[];
  Asks: { Price: number; Volume: number }[];
  MaturityMonthYear: string | null;
  Type: string | null;
  AliasSymbol: string | null;
  ScaleItems: ScaleItem[];
  /** 價差期貨下單時月份買賣別是否反置
   *
   * | Value | 買賣別 | 前月份 | 後月份 |
   * | :---- | :----- | :----- | :----- |
   * | true  | Buy    | Buy    | Sell   |
   * | true  | Sell   | Sell   | Buy    |
   * | false | Buy    | Sell   | Buy    |
   * | false | Sell   | Buy    | Sell   |
   *
   * 範例: 2019/2022
   *
   * ## true:
   *
   * - Buy: Buy 2019, Sell 2022
   *
   * - Sell: Sell 2019, Buy 2022
   *
   * ## false:
   *
   * - Buy: Sell 2019, Buy 2022
   *
   * - Sell: Buy 2019, Sell 2022
   */
  SpreadReverse: boolean;
  Tradeable: boolean;
  /** 轉內部格式後之 symbol */
  RegularizeCode: string;
  /** 檔差最大分母 */
  MaxDenominator: number;
  /** 是否顯示日夜盤切換功能 */
  showDayAndNightBtn:boolean;
  /** 走勢圖不顯示之 非交易時段 */
  SessionGapS: Date | '';
  SessionGapE: Date | '';
  formatDecimal: string;
}

interface ScaleItem {
  ScopeMin: number;
  ScopeMax: number;
  Numerator: number;
  Denominator: number;
  MinMovement: number;
}
