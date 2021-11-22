/**
 * 商品資訊樹
 *
 * key: 交易所代碼
 *
 * value: 交易所資訊
 */
 export interface ProductsTree {
  [exchangeCode: string]: Exchange;
}

export type Category = {
  value: string;
  child?: Category[];
  meta?: string[];
} & ({ child: Category[] } | { meta: string[] });

/**
 * 交易所資訊
 */
export interface Exchange {
  /** 交易所代碼 */
  Code: string;
  /** 交易所名稱 */
  Name: string;
  /** 標的物顯示順序 */
  Products: string[];
  /** 標的物商品資訊
   *
   * key: 標的物商品代碼
   *
   * value: 標的物商品資訊
   */
  ProductsMap: { [targetCode: string]: Target };
  Category: Category[];
}

/**
 * 標的物商品資訊
 */
export interface Target {
  /** 標的物商品代碼 */
  Code: string;
  /** 標的物商品名稱 */
  Name: string;
  /** 標的物商品類別
   *
   * 有兩層分類
   */
  Category: {
    /** 第一層分類 */
    Layer1: string[];
    /** 第二層分類 */
    Layer2: string[] | null;
  };
  /** 選擇權履約價小數點位數 */
  StrikeDec: number;
  /** 價格小數點位數 */
  PriceDec: number;
  /** 價差期貨價格小數點位數 */
  SpreadDec: number;
  /** 該標的下擁有的期貨商品 */
  FutSymbols: FutureSymbolInfo[];
  /** 期貨檔差表 */
  FutScaleItem: ScaleItem[];
  /** 價差期貨檔差表 */
  SpreadScaleItem: ScaleItem[];
  /** 選擇權檔差表 */
  OptScaleItem: ScaleItem[];
  /** 該標的擁有的選擇權之商品資訊 */
  OptMap: {
    [tGroup: string]: OptionInfo;
  } | null;
  Symbols: string[];
}

/**
 * 期貨商品資訊
 */
export interface FutureSymbolInfo {
  /** 商品代號 */
  Symbol: string;
  /** 商品所屬分類 */
  SubClass: string[];
}

/**
 * 選擇權資訊
 */
export interface OptionInfo {
  /** 選擇權月份 */
  ContMonth: string;
  /** 中間價之期貨 */
  TargetFut: string;
}

/**
 * 檔差資訊
 */
export interface ScaleItem {
  /** 檔差下限 */
  ScopeMin: number;
  /** 檔差上限 */
  ScopeMax: number;
  /** 檔差分子 */
  Numerator: number;
  /** 檔差分母 */
  Denominator: number;
  /** 最小移動單位 */
  MinMovement: number;
}
