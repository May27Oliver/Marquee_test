import { AsyncState } from "react-use/lib/useAsync";
import { Quote } from "model/Quote";
import api from "api";

interface UseMultiQuoteParams {
  symbols: string[];
  sessionId: string;
}

export type QuoteMap = {
  [symbol: string]: Quote;
};

const getMultiQuotes = async ({ symbols, sessionId }: UseMultiQuoteParams) => {
  console.log("sessionId", sessionId);
  const quotes = await api.getQuotes({
    symbols: symbols,
    sessionId: sessionId,
  });
  const value = quotes.reduce<QuoteMap>((acc, each) => {
    acc[each.Symbol] = {
      ...each,
    };
    return acc;
  }, {});

  return value;
};

export default getMultiQuotes;
