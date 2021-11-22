import { connectWebSocket } from './socket';
import { TickMessage } from './model';
export * from './subject';
export * from './model';

export function isTickMessage(message: any): message is TickMessage {
  return message.open !== undefined;
}

export const connectQuoteWebSocket = connectWebSocket;
