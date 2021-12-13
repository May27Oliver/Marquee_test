import React from "react";
import { useSetState, useMountedState } from "react-use";
import { merge } from "rxjs";
import { bufferTime, filter, map } from "rxjs/operators";

import { AsyncState } from "react-use/lib/useAsync";
import { Quote } from "model/Quote";
import { TickMessage, BidAskMessage } from "websocket/quote";

import api from "api";
import isVirtualSymbol from "tools/isVirtualSymbol";
import { TickSubject, BidAskSubject } from "websocket/quote";

export interface UseSingleQuoteParams {
  symbol: string;
  sessionId: string;
  /**
   * 內期使用
   * 純日盤為 true
   */
  // onlyRegularSession?: boolean;
}

export const useSingleQuote = function ({
  symbol,
  sessionId,
}: UseSingleQuoteParams): AsyncState<Quote> {
  const isMount = useMountedState();
  const [state, setState] = useSetState<AsyncState<Quote>>({ loading: true });
  const priceDecimalRef = React.useRef<number>(0);
  const aliasSymbolRef = React.useRef("");

  React.useEffect(() => {
    (async function getQuotes() {
      try {
        if (sessionId === "") {
          return;
        }

        setState({ loading: true });
        let quoteSymbol = symbol;
        const quotes = await api.getQuotes({
          symbols: quoteSymbol,
          sessionId: sessionId,
        });

        if (!isMount()) {
          return;
        }

        if (quotes.length < 1) {
          throw new Error("無法取得報價");
        }

        const quote = quotes[0];
        priceDecimalRef.current = quote.PriceDec || 0;
        if (isVirtualSymbol(symbol)) {
          aliasSymbolRef.current = quote.AliasSymbol || "";
        }
        setState(() => ({ loading: false, value: quote, error: undefined }));
      } catch (error) {
        // debugger
        // setState(() => ({ loading: false, error, value: undefined }));
      }
    })();
  }, [symbol, sessionId, isMount, setState]);

  const { loading, error } = state;
  return state;
};

export default useSingleQuote;
