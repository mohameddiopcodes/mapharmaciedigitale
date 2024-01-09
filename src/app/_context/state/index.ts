import { Dispatch } from "react";
import { user, UserType } from "./user";
import { ActionType } from "../actions";
import { error, ErrorType } from "./error";

export type StateType = {
  user: UserType;
  error: ErrorType;
  dispatch: Dispatch<ActionType>;
};

export const INITIAL_STATE = {
  user,
  error,
} as StateType;
