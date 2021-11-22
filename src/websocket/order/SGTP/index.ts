import * as model from './model';
import * as subjects from './subject';

export * from './subject';
export * from './model';

export { subjects };
export type SGTPMessage =
  | model.QueryTodaysOrdersResponse
  | model.QueryHistoryOrdersResponse
  | model.QueryMarginResponse
  | model.QueryOpenInterestResponse
  | model.QueryDepositAndWithdrawResponse
  | model.QueryWithdrawableAmountResponse
  | model.WithdrawRequestResponse
  | model.LiquidationInquiryResponse
  | model.OrderReport
  | model.DealReport
  | model.OrderReply;
