import SockJS from 'sockjs-client';
import pako from 'pako';
import isEqual from 'lodash/isEqual';

import base64StringTest from 'tools/base64-string-test';
import textDecoder from 'tools/text-decoder';

import {
  OrderSocketMessage,
  OrderReportMessage,
  DealReportMessage,
} from './model';

import {
  SGTPMessage,
  subjects as SGTPSubjects,
  OrderReport,
  DealReport,
} from './SGTP';

import {
  HeartbeatSubject,
  SessionIdSubject,
  RiskControlMessageSubject,
  OrderReportMessageSubject,
  DealReportMessageSubject,
  QueryInsuranceMessageSubject,
  QueryOpenPositionMessageSubject,
  QueryDayReversalMessageSubject,
  QueryFuturesStatusMessageSubject,
  QueryPaymentMessageSubject,
  QueryMarginMessageSubject,
  QueryPaymentAndIncomeMessageSubject,
  QueryCapitalTransferMessageSubject,
  QueryDomesticAndForeignPaymentandIncomeMessageSubject,
  QueryMaxPaymentMessageSubject,
  QueryDayCommissionMessageSubject,
  QueryDayTransactionMessageSubject,
  QueryHistoryCommissionMessageSubject,
  QueryHistoryTransactionMessageSubject,
  QueryHistoryReversalMessageSubject,
  QueryHistoryInsuranceMessageSubject,
  QueryYesterdayPositionMessageSubject,
  QueryYesterdayTransactionMessageSubject,
  QueryCustomersSignMessageSubject,
  CheckAndChangePasswordMessageSubject,
  UrgentNoticeSubject,
  DisconnectMessageSubject,
} from './subject';

export interface Parameter {
  url: string;
  token: string;
  onClose: (ev: CloseEvent) => void;
}

export function connectWebSocket({ url, token, onClose }: Parameter) {
  const sock = new SockJS(url, null, {
    sessionId: () => token,
  });

  sock.onopen = function () {
    console.log(`{ order } web socket [onOpen], open on: ${sock.url}`);
  };

  sock.onclose = function (ev) {
    console.log('{ order } web socket [onClose]');
    onClose(ev);
  };

  sock.onerror = (e) => {
    console.log(`{ order } web socket [onError], reason: ${JSON.stringify(e)}`);
  };

  let lastOrderReportMessage: OrderReportMessage | null = null;
  let lastDealReportMessage: DealReportMessage | null = null;

  sock.onmessage = ({ data }) => {
    const message = (JSON.parse(
      base64StringTest(data)
        ? textDecoder(pako.inflate(window.atob(data)))
        : data,
    ) as OrderSocketMessage) as any;

    console.log(message);
    if (isSGTPMessage(message)) {
      SGTPMessageHandler(message as SGTPMessage);
      return;
    }

    OMSMessageHandler(lastOrderReportMessage, lastDealReportMessage, message);
  };

  return sock;
}

function isSGTPMessage(object: any): boolean {
  return 'subject' in object;
}

function OMSMessageHandler(
  lastOrderReportMessage: OrderReportMessage | null,
  lastDealReportMessage: DealReportMessage | null,
  message: OrderSocketMessage,
) {
  switch (message.FCODE) {
    /** Backstage custom add protocol */
    case 'UrgentNotice':
      UrgentNoticeSubject.next(message);
      return;
    case 'session':
      SessionIdSubject.next({
        SessionId: message.SessionID,
        BaseClOrdId: message.BaseClOrdId,
      });
      return;
    case 'disconnect':
      DisconnectMessageSubject.next(message);
      return;

    /** OMS protocol */
    case '21':
      HeartbeatSubject.next();
      return;
    case '11':
      RiskControlMessageSubject.next(message);
      return;
    case '23':
      if (isEqual(lastOrderReportMessage, message)) {
        return;
      }
      lastOrderReportMessage = message;
      OrderReportMessageSubject.next(message);
      return;
    case '24':
      if (isEqual(lastDealReportMessage, message)) {
        return;
      }
      lastDealReportMessage = message;
      DealReportMessageSubject.next(message);
      return;
    case '25':
      OrderReportMessageSubject.next(message);
      return;
    case '26':
      DealReportMessageSubject.next(message);
      return;
    case '42':
      QueryInsuranceMessageSubject.next(message);
      return;
    case '43':
      QueryOpenPositionMessageSubject.next(message);
      return;
    case '44':
      QueryDayReversalMessageSubject.next(message);
      return;
    case '45':
      QueryFuturesStatusMessageSubject.next(message);
      return;
    case '46':
      QueryPaymentMessageSubject.next(message);
      return;
    case '47':
      QueryMarginMessageSubject.next(message);
      return;
    case '48':
      QueryPaymentAndIncomeMessageSubject.next(message);
      return;
    case '4A':
      QueryCapitalTransferMessageSubject.next(message);
      return;
    case '4E':
      QueryDomesticAndForeignPaymentandIncomeMessageSubject.next(message);
      return;
    case '4F':
      QueryMaxPaymentMessageSubject.next(message);
      return;
    case '61':
      QueryDayCommissionMessageSubject.next(message);
      return;
    case '62':
      QueryDayTransactionMessageSubject.next(message);
      return;
    case '63':
      QueryHistoryCommissionMessageSubject.next(message);
      return;
    case '64':
      QueryHistoryTransactionMessageSubject.next(message);
      return;
    case '65':
      QueryHistoryReversalMessageSubject.next(message);
      return;
    case '66':
      QueryHistoryInsuranceMessageSubject.next(message);
      return;
    case '67':
      QueryYesterdayPositionMessageSubject.next(message);
      return;
    case '68':
      QueryYesterdayTransactionMessageSubject.next(message);
      return;
    case '80':
      QueryCustomersSignMessageSubject.next(message);
      return;
    case '81':
      CheckAndChangePasswordMessageSubject.next(message);
      return;

    default:
      console.log(`Got unknown FCODE = "${(message as any).FCODE}" `);
  }
}

const DOMESTIC_ORDER_REPORT_STORAGE: Map<string, OrderReport> = new Map();
const DOMESTIC_DEAL_REPORT_STORAGE: Map<string, DealReport> = new Map();

function SGTPMessageHandler(message: SGTPMessage) {
  switch (message.fcode) {
    case '48': {
      /** 刪單成功的有效口數清 0， SGTP 回的時候非 0 */
      const alterReply =
        message.reply?.map((each) => {
          if (each.cmd === '1' && each.code === '0000') {
            each.remqty = '0';
          }
          return each;
        }) ?? [];
      message.reply = alterReply;
      SGTPSubjects.QueryTodaysOrdersSubject.next(message);
      return;
    }
    case '55':
      SGTPSubjects.QueryHistoryOrdersSubject.next(message);
      return;
    case '50':
      SGTPSubjects.QueryMarginSubject.next(message);
      return;
    case '51':
      SGTPSubjects.QueryOpenInterestSubject.next(message);
      return;
    case '54':
      SGTPSubjects.QueryDepositAndWithdrawSubject.next(message);
      return;
    case '69':
      SGTPSubjects.QueryWithdrawableAmountSubject.next(message);
      return;
    case '68':
      SGTPSubjects.WithdrawRequestSubject.next(message);
      return;
    case '66':
      SGTPSubjects.LiquidationInquirySubject.next(message);
      return;
    case '6': {
      /** 委託回報拆成一個一個送 */
      const { reply, ...rest } = message;
      reply.forEach((each) => {
        const combine = { ...rest, reply: [each] };
        if (each.itype === '0') {
          SGTPSubjects.OrderReportMessageSubject.next([combine]);
          return;
        }

        const orderNo = each.ordno;
        if (!DOMESTIC_ORDER_REPORT_STORAGE.get(orderNo)) {
          DOMESTIC_ORDER_REPORT_STORAGE.set(orderNo, combine);
          return;
        }

        SGTPSubjects.OrderReportMessageSubject.next(
          [DOMESTIC_ORDER_REPORT_STORAGE.get(orderNo)!, combine].sort((a, b) =>
            a.reply[0].legno < b.reply[0].legno ? -1 : 1,
          ) as [OrderReport, OrderReport?],
        );
        DOMESTIC_ORDER_REPORT_STORAGE.delete(orderNo);
      });
      return;
    }
    case '7': {
      /** 成交回報拆成一個一個送 */
      const { fill, ...rest } = message;
      fill.forEach((each) => {
        const combine = { ...rest, fill: [each] };
        if (each.itype === '0') {
          SGTPSubjects.DealReportMessageSubject.next([combine]);
          return;
        }

        const orderNo = each.ordno;
        if (!DOMESTIC_DEAL_REPORT_STORAGE.get(orderNo)) {
          DOMESTIC_DEAL_REPORT_STORAGE.set(orderNo, combine);
          return;
        }

        SGTPSubjects.DealReportMessageSubject.next(
          [DOMESTIC_DEAL_REPORT_STORAGE.get(orderNo)!, combine].sort((a, b) =>
            a.fill[0].legno < b.fill[0].legno ? -1 : 1,
          ) as [DealReport, DealReport?],
        );
        DOMESTIC_DEAL_REPORT_STORAGE.delete(orderNo);
      });
      return;
    }
    case '5':
      /** 委託回應拆成一個一個送 */
      const { reply, ...rest } = message;
      reply.forEach((each) =>
        SGTPSubjects.OrderReplyMessageSubject.next({ ...rest, reply: [each] }),
      );
      return;
    default:
      console.log(
        `%cGot unknown fcode: [${(message as any).fcode}]`,
        'color: red;',
      );
  }
}
