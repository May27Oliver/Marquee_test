import React from "react";

import { Quote } from "model/Quote";

import useSingleQuote, { UseSingleQuoteParams } from "hooks/useSingleQuote";
import { useApexStateContext } from "context/Apex";
import LoadingOverlay from "component/LoadingOverlay";

export interface SingleQuoteProps
  extends Omit<UseSingleQuoteParams, "sessionId"> {
  children: (quote: Quote) => React.ReactElement<any, any> | null;
}
const SingleQuote: React.FC<SingleQuoteProps> = ({ symbol, children }) => {
  const { masterSessionId } = useApexStateContext();
  const {
    loading,
    value: quote,
    error,
  } = useSingleQuote({
    symbol,
    sessionId: masterSessionId,
  });
  if (error || !quote) {
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
  console.log("取到Quote啦", quote);
  return (
    <>
      {loading && <LoadingOverlay isOpen />}
      {children(quote)}
    </>
  );
};

export default SingleQuote;
