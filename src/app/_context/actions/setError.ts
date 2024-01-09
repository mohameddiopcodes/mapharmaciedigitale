import { Dispatch } from "react";
import { ActionType } from ".";
import { ErrorType } from "../state/error";

export default function setError(
  payload: ErrorType,
  dispatch: Dispatch<ActionType>
) {
  dispatch({
    type: "SET_ERROR",
    payload,
  });
}
