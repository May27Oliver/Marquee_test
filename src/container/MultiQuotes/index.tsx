import React from "react";
import useMultiQuotes, {
  UseMultiQuoteParams,
  QuoteMap,
} from "hooks/useMultiQuotes";
import { useApexStateContext } from "context/Apex";
import LoadingOverlay from "component/LoadingOverlay";

export interface MultiQuoteProps
  extends Omit<UseMultiQuoteParams, "sessionId"> {
  callback(): void;
  children: (quote: QuoteMap) => React.ReactElement<any, any>[] | null;
}
const MultiQuotes: React.FC<MultiQuoteProps> = ({
  symbols,
  callback,
  children,
}) => {
  const { masterSessionId } = useApexStateContext();
  const {
    loading,
    value: quotes,
    error,
  } = useMultiQuotes({
    symbols,
    sessionId: masterSessionId,
  });
  if (error || !quotes) {
    // debugger;
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        發生錯誤: {error?.message}
      </div>
    );
  }
  callback?.();
  return (
    <>
      {loading && <LoadingOverlay isOpen />}
      {children(quotes)}
    </>
  );
};

export default MultiQuotes;
