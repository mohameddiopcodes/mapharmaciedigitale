import { DashboardType } from "../state/dashboard";
import { ErrorType } from "../state/error";
import { PharmacyType } from "../state/pharmacy";
import { UserType } from "../state/user";
import { PharmacyWorkerType } from "../state/worker";

export type PayloadTypes = {
  SET_USER?: UserType;
  SET_ERROR?: ErrorType;
  SET_DASHBOARD?: DashboardType;
  SET_PHARMACY?: PharmacyType;
  SET_WORKERS?: PharmacyWorkerType;
  SET_MODAL?: boolean;
};

export type ActionType = {
  type: keyof PayloadTypes;
  payload:
    | UserType
    | ErrorType
    | DashboardType
    | PharmacyType
    | PharmacyWorkerType
    | boolean;
};
