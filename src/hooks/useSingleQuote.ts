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
  React.useEffect(() => {
    if (loading || error) {
      return;
    }

    const isTickMessage = (message: any): message is TickMessage =>
      message.open !== undefined;
    const subscriber = merge(TickSubject, BidAskSubject)
      .pipe(
        filter(
          (message) =>
            message.symbol === symbol ||
            message.symbol === aliasSymbolRef.current
        ),
        bufferTime(1000 / 30),
        filter((messages) => messages.length > 0),
        map<(TickMessage | BidAskMessage)[], Partial<Quote>>((messages) => {
          const digitMover = (() => {
            const delimiter = Math.pow(10, priceDecimalRef.current);
            return (value: number) => value / delimiter;
          })();
          const updateQuote = messages.reduce<Partial<Quote>>(
            (acc, message) => {
              let updateData: Partial<Quote>;

              if (isTickMessage(message)) {
                updateData = {
                  Open: digitMover(message.open),
                  Price: digitMover(message.price),
                  TotalVolume: message.totalVolume,
                  UpDown: digitMover(message.upDown),
                  UpDownRate: message.upDownRate / 100,
                  High: digitMover(message.high),
                  Low: digitMover(message.low),
                  PrePrice: digitMover(message.prePrice),
                  BuyCount: message.buyCount,
                  SellCount: message.sellCount,
                  Volume: message.volume.toString(),
                  lastCoverTickTime: new Date(message.tickTime),
                };
              } else {
                const Bids =
                  message.Bid.length > 0
                    ? message.Bid.map(({ Price, Vol }) => ({
                        Price: digitMover(parseFloat(Price)),
                        Volume: parseInt(Vol),
                      }))
                    : [];
                const Asks =
                  message.Ask.length > 0
                    ? message.Ask.map(({ Price, Vol }) => ({
                        Price: digitMover(parseFloat(Price)),
                        Volume: parseInt(Vol),
                      }))
                    : [];
                const APrice = (Asks.length > 0 && Asks[0].Price) || null;
                const AVol = (Asks.length > 0 && Asks[0].Volume) || null;
                const BPrice = (Bids.length > 0 && Bids[0].Price) || null;
                const BVol = (Bids.length > 0 && Bids[0].Volume) || null;

                updateData = {
                  ...acc,
                  AskPrice: APrice,
                  AskVolume: AVol,
                  BidPrice: BPrice,
                  BidVolume: BVol,
                  Bids: Bids,
                  Asks: Asks,
                };
              }

              return { ...acc, ...updateData };
            },
            {}
          );

          return updateQuote;
        })
      )
      .subscribe((updateQuote) => {
        if (!isMount()) {
          return;
        }
        setState((prev) => ({
          value: { ...prev.value!, ...updateQuote },
        }));
      });

    return () => {
      subscriber.unsubscribe();
    };
  }, [symbol, loading, error, setState, isMount]);

  return state;
};

export default useSingleQuote;
