import { Quote } from "model/Quote";
import api from "api";

export interface UseSingleQuoteParams {
  symbol: string;
  sessionId: string;
}

const getSingleQuote = async ({ symbol, sessionId }: UseSingleQuoteParams) => {
  if (!sessionId) return;
  const quotes = await api.getQuotes({
    symbols: symbol,
    sessionId,
  });
  const quote = quotes[0];
  return quote;
};

export default getSingleQuote;
