import { Dispatch } from "react";
import { ActionType } from ".";
import { PharmacyWorkerType } from "../state/worker";

export default function setWorkers(
  payload: PharmacyWorkerType,
  dispatch: Dispatch<ActionType>
) {
  dispatch({
    type: "SET_WORKERS",
    payload,
  });
}
