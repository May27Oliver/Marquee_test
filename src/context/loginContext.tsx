import { Reducer } from "react";
import { createContext } from "./createContext";

const initialState = {
  login: false,
};

type Action = { type: "SET_LOGIN"; payload: boolean };

const reducer: Reducer<typeof initialState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, login: action.payload };
    default:
      return state;
  }
};

const {
  provider: LoginProvider,
  useStateContext: useLoginStateContext,
  useDispatchContext: useLoginDispatchContext,
  useContext: useLoginContext,
} = createContext("Login", reducer, initialState);

export {
  LoginProvider,
  useLoginStateContext,
  useLoginDispatchContext,
  useLoginContext,
};
