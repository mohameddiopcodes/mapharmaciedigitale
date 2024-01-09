import { Reducer } from "react";
import { StateType as S } from "../state";
import { ActionType as A } from "../actions";

const reducer: Reducer<S, A> = (state: S, action: A) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: { ...state.error, ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
