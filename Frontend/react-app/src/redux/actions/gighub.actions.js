
import { USERMODE,ISSELLER } from "../types/gighub.types";

export const setUserMode = (data) => (dispatch) => {
  dispatch({
    type: USERMODE,
    payload: data,
  });
};
export const setIsSeller = (data) => (dispatch) => {
  console.log(data,'issellerdata')
  dispatch({
    type: ISSELLER,
    payload: data,
  });
};