import { Reducer } from "react";
import { createContext } from "./createContext";

const initialState = {
  symbols: [] as string[],
  lineSpeed: 40,
};

type Action =
  | { type: "SET_MARQUEE_SYMBOLS"; payload: string[] }
  | { type: "SET_SPEED"; payload: number };

const reducer: Reducer<typeof initialState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_MARQUEE_SYMBOLS":
      return { ...state, symbols: action.payload };
    case "SET_SPEED":
      return { ...state, lineSpeed: action.payload };
    default:
      return state;
  }
};

const {
  provider: MarqueeProvider,
  useStateContext: useMarqueeStateContext,
  useDispatchContext: useMarqueeDispatchContext,
  useContext: useMarqueeContext,
} = createContext("Marquee", reducer, initialState);

export {
  MarqueeProvider,
  useMarqueeStateContext,
  useMarqueeDispatchContext,
  useMarqueeContext,
};
