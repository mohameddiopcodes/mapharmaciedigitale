import { Dispatch } from "react";
import { ActionType } from ".";
import { UserType } from "../state/user";

export default function setUser(
  payload: UserType,
  dispatch: Dispatch<ActionType>
) {
  dispatch({
    type: "SET_USER",
    payload,
  });
}
