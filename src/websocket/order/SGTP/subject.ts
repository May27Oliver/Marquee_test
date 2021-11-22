import { Subject } from 'rxjs';

import {
  QueryHistoryOrdersResponse,
  QueryTodaysOrdersResponse,
  QueryMarginResponse,
  QueryOpenInterestResponse,
  QueryDepositAndWithdrawResponse,
  QueryWithdrawableAmountResponse,
  WithdrawRequestResponse,
  LiquidationInquiryResponse,
  OrderReport,
  DealReport,
  OrderReply,
} from './model';

/** 今日委託查詢回應 Subject */
export const QueryTodaysOrdersSubject = new Subject<
  QueryTodaysOrdersResponse
>();
/** 歷史委託查詢回應 Subject */
export const QueryHistoryOrdersSubject = new Subject<
  QueryHistoryOrdersResponse
>();
/** 權益數查詢回應 Subject */
export const QueryMarginSubject = new Subject<QueryMarginResponse>();
/** 未平倉查詢回應 Subject */
export const QueryOpenInterestSubject = new Subject<
  QueryOpenInterestResponse
>();
/** 出入金查詢回應 Subject */
export const QueryDepositAndWithdrawSubject = new Subject<
  QueryDepositAndWithdrawResponse
>();
/** 可出金額查詢回應 Subject */
export const QueryWithdrawableAmountSubject = new Subject<
  QueryWithdrawableAmountResponse
>();
/** 出金申請回應 Subject */
export const WithdrawRequestSubject = new Subject<WithdrawRequestResponse>();
/** 沖銷明細回應 Subject */
export const LiquidationInquirySubject = new Subject<
  LiquidationInquiryResponse
>();
/** 委託回報 Subject
 *
 * 傳遞的資料為委託回報陣列， 裡面可能包含 1, 2 兩筆委託回報資訊
 * - 1: 單式單
 * - 2: 複式單
 * */
export const OrderReportMessageSubject = new Subject<
  [OrderReport, OrderReport?]
>();
/** 成交回報 Subject
 *
 * 傳遞的資料為委託回報陣列， 裡面可能包含 1, 2 兩筆委託回報資訊
 * - 1: 單式單
 * - 2: 複式單
 */
export const DealReportMessageSubject = new Subject<
  [DealReport, DealReport?]
>();
/** 委託狀態 Subject */
export const OrderReplyMessageSubject = new Subject<OrderReply>();
