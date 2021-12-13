import React from "react";
import { useSetState, useMountedState } from "react-use";
import { AsyncState } from "react-use/lib/useAsync";
import { Quote } from "model/Quote";
import api from "api";
import { isVirtualSymbol } from "tools/isVirtualSymbol";

export interface UseMultiQuoteParams {
  symbols: string[];
  sessionId: string;
}

export type QuoteMap = {
  [symbol: string]: Quote;
};

export const useMultiQuotes = function ({
  symbols,
  sessionId,
}: UseMultiQuoteParams): AsyncState<QuoteMap> {
  const isMount = useMountedState();
  const [state, setState] = useSetState<AsyncState<QuoteMap>>({
    loading: true,
  });
  const priceDecimalDictionaryRef = React.useRef<{ [symbol: string]: number }>(
    {}
  );
  const realSymbolToVirtualSymbolMap = React.useRef<{
    [symbol: string]: string;
  }>({});

  React.useEffect(() => {
    if (sessionId === "") {
      return;
    }
    (async function getQuotes() {
      setState(() => ({ loading: true }));

      const quotes = await api.getQuotes({
        symbols: symbols,
        sessionId: sessionId,
      });

      if (!isMount()) {
        return;
      }

      if (quotes.length < 0) {
        setState(() => ({ loading: false, error: new Error("not found") }));
      } else {
        priceDecimalDictionaryRef.current = quotes.reduce<{
          [symbol: string]: number;
        }>((acc, { Symbol, PriceDec, AliasSymbol }) => {
          if (PriceDec === null) {
            return acc;
          }
          if (isVirtualSymbol(Symbol) && AliasSymbol) {
            acc[AliasSymbol] = PriceDec;
          }
          acc[Symbol] = PriceDec;
          return acc;
        }, {});

        realSymbolToVirtualSymbolMap.current = quotes.reduce<{
          [symbol: string]: string;
        }>((acc, quote) => {
          if (isVirtualSymbol(quote.Symbol) && quote.AliasSymbol) {
            acc[quote.AliasSymbol] = quote.Symbol;
          }
          return acc;
        }, {});

        const value = quotes.reduce<QuoteMap>((acc, each) => {
          acc[each.Symbol] = {
            ...each,
          };
          return acc;
        }, {});
        setState(() => ({ loading: false, value: value }));
      }
    })();
  }, [symbols, sessionId, isMount, setState]);

  return state;
};

export default useMultiQuotes;
