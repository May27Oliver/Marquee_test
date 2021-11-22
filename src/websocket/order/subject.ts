import { Subject } from 'rxjs';

import { AccountInfo } from 'model/accountInfo';

import {
  RiskControlMessage,
  OrderReportMessage,
  DealReportMessage,
  QueryInsuranceMessage,
  QueryOpenPositionMessage,
  QueryDayReversalMessage,
  QueryFuturesStatusMessage,
  QueryPaymentMessage,
  QueryMarginMessage,
  QueryPaymentAndIncomeMessage,
  QueryDomesticAndForeignPaymentandIncomeMessage,
  QueryCapitalTransferMessage,
  QueryMaxPaymentMessage,
  QueryDayCommissionMessage,
  QueryDayTransactionMessage,
  QueryHistoryCommissionMessage,
  QueryHistoryTransactionMessage,
  QueryHistoryReversalMessage,
  QueryHistoryInsuranceMessage,
  QueryYesterdayPositionMessage,
  QueryYesterdayTransactionMessage,
  QueryCustomersSignMessage,
  CheckAndChangePasswordMessage,
  UrgentNoticeMessage,
  DisconnectMessage,
} from './model';

export const HeartbeatSubject = new Subject<undefined>();
export const SessionIdSubject = new Subject<{
  SessionId: string;
  BaseClOrdId: string;
}>();
export const UrgentNoticeSubject = new Subject<UrgentNoticeMessage>();
export const DisconnectMessageSubject = new Subject<DisconnectMessage>();
export const AccountInfoSubject = new Subject<AccountInfo[]>();
export const RiskControlMessageSubject = new Subject<RiskControlMessage>();
export const OrderReportMessageSubject = new Subject<OrderReportMessage>();
export const DealReportMessageSubject = new Subject<DealReportMessage>();

export const QueryInsuranceMessageSubject = new Subject<
  QueryInsuranceMessage
>();
export const QueryOpenPositionMessageSubject = new Subject<
  QueryOpenPositionMessage
>();
export const QueryDayReversalMessageSubject = new Subject<
  QueryDayReversalMessage
>();
export const QueryFuturesStatusMessageSubject = new Subject<
  QueryFuturesStatusMessage
>();
export const QueryPaymentMessageSubject = new Subject<QueryPaymentMessage>();
export const QueryMarginMessageSubject = new Subject<QueryMarginMessage>();
export const QueryPaymentAndIncomeMessageSubject = new Subject<
  QueryPaymentAndIncomeMessage
>();
export const QueryDomesticAndForeignPaymentandIncomeMessageSubject = new Subject<
  QueryDomesticAndForeignPaymentandIncomeMessage
>();
export const QueryCapitalTransferMessageSubject = new Subject<
  QueryCapitalTransferMessage
>();
export const QueryMaxPaymentMessageSubject = new Subject<
  QueryMaxPaymentMessage
>();
export const QueryDayCommissionMessageSubject = new Subject<
  QueryDayCommissionMessage
>();
export const QueryDayTransactionMessageSubject = new Subject<
  QueryDayTransactionMessage
>();
export const QueryHistoryCommissionMessageSubject = new Subject<
  QueryHistoryCommissionMessage
>();
export const QueryHistoryTransactionMessageSubject = new Subject<
  QueryHistoryTransactionMessage
>();
export const QueryHistoryReversalMessageSubject = new Subject<
  QueryHistoryReversalMessage
>();
export const QueryHistoryInsuranceMessageSubject = new Subject<
  QueryHistoryInsuranceMessage
>();
export const QueryYesterdayPositionMessageSubject = new Subject<
  QueryYesterdayPositionMessage
>();
export const QueryYesterdayTransactionMessageSubject = new Subject<
  QueryYesterdayTransactionMessage
>();
export const QueryCustomersSignMessageSubject = new Subject<
  QueryCustomersSignMessage
>();
export const CheckAndChangePasswordMessageSubject = new Subject<
  CheckAndChangePasswordMessage
>();
