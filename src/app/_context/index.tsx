"use client";
import {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { ActionType } from "./actions";
import reducer from "./reducer";
import { INITIAL_STATE, StateType } from "./state";
import { useSearchParams } from "next/navigation";
import setUser from "./actions/setUser";

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
  const searchParams = useSearchParams();
  const contact = useMemo(
    () => (searchParams ? searchParams.get("contact")?.split("/") : null),
    []
  );

  if (!state.user.name && contact && contact.length > 2) {
    setUser(
      { name: contact[0], phone: contact[1], role: parseInt(contact[2]) },
      dispatch
    );
  }

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Context;
