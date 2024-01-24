import { Dispatch } from "react";
import { ActionType } from ".";

export default function setModal(
  payload: boolean,
  dispatch: Dispatch<ActionType>
) {
  dispatch({
    type: "SET_MODAL",
    payload,
  });
}
