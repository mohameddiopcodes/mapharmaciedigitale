import { Dispatch } from "react";
import { ActionType } from ".";
import { PharmacyType } from "../state/pharmacy";

export default function setPharmacy(
  payload: PharmacyType,
  dispatch: Dispatch<ActionType>
) {
  dispatch({
    type: "SET_PHARMACY",
    payload,
  });
}
