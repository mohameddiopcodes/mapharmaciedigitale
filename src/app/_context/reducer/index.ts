import { Reducer } from "react";
import { StateType as S } from "../state";
import { ActionType as A } from "../actions";
import { PharmacyWorkerType } from "../state/worker";
import { UserType } from "../state/user";
import { ErrorType } from "../state/error";
import { DashboardType } from "../state/dashboard";
import { PharmacyType } from "../state/pharmacy";

const reducer: Reducer<S, A> = (state: S, action: A) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...state.user, ...(action.payload as UserType) },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: { ...state.error, ...(action.payload as ErrorType) },
      };
    case "SET_DASHBOARD":
      return {
        ...state,
        dashboard: { ...state.dashboard, ...(action.payload as DashboardType) },
      };
    case "SET_PHARMACY":
      return {
        ...state,
        pharmacy: { ...state.pharmacy, ...(action.payload as PharmacyType) },
      };
    case "SET_WORKERS":
      return {
        ...state,
        workers: [...state.workers, action.payload] as [PharmacyWorkerType],
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.payload as boolean,
      };
    default:
      return state;
  }
};

export default reducer;
