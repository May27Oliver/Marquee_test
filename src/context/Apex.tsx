import { Reducer } from "react";
import { createContext } from "./createContext";

const initialState = {
  masterSessionId: "",
  masterSocket: null as WebSocket | null,
  slaveSessionId: "",
  slaveSocket: null as WebSocket | null,
};

type Action =
  | {
      type: "SET_MASTER_SESSION_ID";
      payload: string;
    }
  | {
      type: "SET_MASTER_SOCKET";
      payload: WebSocket;
    }
  | {
      type: "CLOSE_MASTER_SOCKET";
    }
  | {
      type: "SET_SLAVE_SESSION_ID";
      payload: string;
    }
  | {
      type: "SET_SLAVE_SOCKET";
      payload: WebSocket;
    }
  | {
      type: "CLOSE_SLAVE_SOCKET";
    };

const reducer: Reducer<typeof initialState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_MASTER_SESSION_ID":
      return { ...state, masterSessionId: action.payload };
    case "SET_MASTER_SOCKET":
      return { ...state, masterSocket: action.payload };
    case "CLOSE_MASTER_SOCKET": {
      try {
        const { masterSocket: socket } = state;
        if (socket !== null && socket.readyState !== socket.CLOSED) {
          socket.close();
        }
        return { ...state, masterSocket: null, masterSessionId: "" };
      } catch (error) {}
      return { ...state, masterSocket: null };
    }
    case "SET_SLAVE_SESSION_ID":
      return { ...state, slaveSessionId: action.payload };
    case "SET_SLAVE_SOCKET":
      return { ...state, slaveSocket: action.payload };
    case "CLOSE_SLAVE_SOCKET": {
      try {
        const { slaveSocket: socket } = state;
        if (socket !== null && socket.readyState !== socket.CLOSED) {
          socket.close();
        }
        return { ...state, slaveSocket: null, slaveSessionId: "" };
      } catch (error) {}
      return { ...state, masterSocket: null };
    }
    default:
      return state;
  }
};

const {
  provider: ApexProvider,
  useStateContext: useApexStateContext,
  useDispatchContext: useApexDispatchContext,
  useContext: useApexContext,
} = createContext("Apex", reducer, initialState);

export {
  ApexProvider,
  useApexStateContext,
  useApexDispatchContext,
  useApexContext,
};
