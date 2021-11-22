import { Subject } from 'rxjs';

import {
  KLineMessage,
  BidAskMessage,
  TickMessage,
  UpdateEventMessage,
} from './model';

const HeartbeatSubject = new Subject<undefined>();
const SessionIdSubject = new Subject<{ from: string; sessionId: string }>();
const BidAskSubject = new Subject<BidAskMessage>();
const KLineSubject = new Subject<KLineMessage>();
const TickSubject = new Subject<TickMessage>();
const UpdateEventSubject = new Subject<UpdateEventMessage>();

export {
  HeartbeatSubject,
  SessionIdSubject,
  BidAskSubject,
  KLineSubject,
  TickSubject,
  UpdateEventSubject,
};
