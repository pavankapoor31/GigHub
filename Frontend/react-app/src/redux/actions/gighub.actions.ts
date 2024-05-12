
import { USERMODE } from "../types/gighub.types";

export const setUserMode = (data: any) => (dispatch: any) => {
  dispatch({
    type: USERMODE,
    payload: data,
  });
};