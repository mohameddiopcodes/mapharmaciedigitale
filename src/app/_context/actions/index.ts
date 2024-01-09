import { ErrorType } from "../state/error";
import { UserType } from "../state/user";

export type PayloadTypes = {
  SET_USER?: UserType;
  SET_ERROR?: ErrorType;
};

export type ActionType = {
  type: keyof PayloadTypes;
  payload: UserType | ErrorType;
};
