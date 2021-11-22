import { Reducer } from "react";

import { SelfChoiceView } from "model/SelfChoiceView";
import { MarketType } from "model/MarketType";

import { createContext } from "./createContext";

interface AppState {
  isLogin: boolean;
  isGuestMode: boolean;
  isSideDrawOpen: boolean;
  marketType: MarketType;
  selfChoiceView: SelfChoiceView;
  selfChoiceOpenTarget: string | null;
}

const initialState: AppState = {
  isLogin: false,
  isGuestMode: false,
  isSideDrawOpen: false,
  marketType: "all",
  selfChoiceView: "watchList",
  selfChoiceOpenTarget: null,
};

type Action =
  | {
      type: "SET_SHOW_SIDE_DRAWER";
      payload: boolean;
    }
  | {
      type: "LOGIN_SUCCESS";
      payload?: {
        isGuestMode: boolean;
      };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SET_MARKET_TYPE";
      payload: MarketType;
    }
  | {
      type: "SET_SELF_CHOICE_VIEW";
      payload: AppState["selfChoiceView"];
    }
  | {
      type: "SET_SELF_CHOICE_OPEN_TARGET";
      payload: AppState["selfChoiceOpenTarget"];
    };

const reducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_SHOW_SIDE_DRAWER":
      return { ...state, isSideDrawOpen: action.payload };
    default:
      return state;
  }
};

const {
  provider: AppInfoProvider,
  useStateContext: useAppInfoStateContext,
  useDispatchContext: useAppInfoDispatchContext,
  useContext: useAppInfoContext,
} = createContext("AppInfo", reducer, initialState);

export {
  AppInfoProvider,
  useAppInfoStateContext,
  useAppInfoDispatchContext,
  useAppInfoContext,
};
