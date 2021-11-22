export enum Mode {
  ADD_TICK = 51,
  UPDATE_BA = 53,
  UPDATE_EVENT = 57,
  UPDATE_K_LINE = 61,
}

export interface KLineMessage {
  symbol: string;
  tickTime: number;
  open: string;
  high: string;
  low: string;
  price: string;
  vol: string;
  totalVolume: string;
}

export interface BidAskMeta {
  Vol: string;
  Price: string;
}

export interface BidAskMessage {
  symbol: string;
  Bid: BidAskMeta[];
  Ask: BidAskMeta[];
}

export interface TickMessage {
  symbol: string;
  askPrice: number;
  askVolume: number;
  bidPrice: number;
  bidVolume: number;
  open: number;
  price: number;
  volume: number;
  totalVolume: number;
  upDown: number;
  upDownRate: number;
  high: number;
  low: number;
  prePrice: number;
  buyCount: number;
  sellCount: number;
  tickTime: number;
  tradeType: number;
}

export interface UpdateEventMessage {
  /**
   * 目標欄位
   * "Cont" : 契約
   * "MK" : 市場
   * "EXCH" : 交易所
   * "SecType" : 類別
   * "SYMBO" : 商品
   */
  filterColumn: 'Cont' | 'MK' | 'EXCH' | 'SecType' | 'SYMBO';
  /**
   * 目標欄位值
   */
  filterVal: string;
  eventTime: Date;
  /**
   * 事件類別
   * 1: INFO
   * 2: QUOTE
   * 3: 統計資訊
   * 4: NEWSYMBOL
   * 5: STATCHG
   */
  eventType: 1 | 2 | 3 | 4 | 5;
  columnListCount: number;
  columnList: { columnName: string; columnValue: string }[];
}

export const COLUMN_OF_SYMBOL = '48';
