"use client";
import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { ActionType } from "./actions";
import reducer from "./reducer";
import { INITIAL_STATE, StateType } from "./state";

interface ContextType {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

const Context = createContext<ContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Context;
