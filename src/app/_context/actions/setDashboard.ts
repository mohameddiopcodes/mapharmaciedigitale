import { Dispatch } from "react";
import { ActionType } from ".";
import { type DashboardType } from "../state/dashboard";

export default function setDashboard(
  payload: DashboardType,
  dispatch: Dispatch<ActionType>
) {
  dispatch({
    type: "SET_DASHBOARD",
    payload,
  });
}
