import React, { Reducer, Dispatch } from "react";

interface ProviderProps<S> {
  value?: S;
}

function createContext<S, A>(
  contextName: string,
  reducer: Reducer<S, A>,
  defaultInitialState: S
): {
  provider: React.FC<ProviderProps<S>>;
  useStateContext: () => S;
  useDispatchContext: () => Dispatch<A>;
  useContext: () => [S, Dispatch<A>];
} {
  const StateContext = React.createContext<S | undefined>(undefined);
  const DispatchContext = React.createContext<Dispatch<A> | undefined>(
    undefined
  );

  StateContext.displayName = `${contextName}StateContext`;
  DispatchContext.displayName = `${contextName}DispatchContext`;
  const provider: React.FC<ProviderProps<S>> = ({ value, children }) => {
    // eslint-disable-next-line
    const [state, dispatch] = React.useReducer(
      reducer,
      value || defaultInitialState
    );

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    );
  };

  const useStateContext = () => {
    const value = React.useContext(StateContext);
    if (value === undefined) {
      throw Error(
        `use${contextName}StateContext must be used within a ${contextName}Provider.`
      );
    }
    return value;
  };

  const useDispatchContext = () => {
    const value = React.useContext(DispatchContext);
    if (value === undefined) {
      throw Error(
        `use${contextName}StateContext must be used within a ${contextName}Provider.`
      );
    }
    return value;
  };

  const useContext: () => [S, Dispatch<A>] = () => {
    return [useStateContext(), useDispatchContext()];
  };

  return { provider, useStateContext, useDispatchContext, useContext };
}

export { createContext };
