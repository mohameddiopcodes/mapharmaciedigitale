import { Dispatch } from "react";
import { user, UserType } from "./user";
import { ActionType } from "../actions";
import { error, ErrorType } from "./error";
import { dashboard, DashboardType } from "./dashboard";
import { pharmacy, PharmacyType } from "./pharmacy";
import { PharmacyWorkerType } from "./worker";

export type StateType = {
  user: UserType;
  error: ErrorType;
  dashboard: DashboardType;
  pharmacy: PharmacyType;
  workers: [] | [PharmacyWorkerType];
  dispatch: Dispatch<ActionType>;
  modal: boolean;
};

export const INITIAL_STATE = {
  user,
  error,
  dashboard,
  pharmacy,
  workers: [],
  modal: false,
} as StateType;
