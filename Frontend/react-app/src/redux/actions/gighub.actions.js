
import { USERMODE,ISSELLER ,SETFREELANCERID,SETROLE,SETFREELANCERDATA,SETCLIENTDATA} from "../types/gighub.types";

export const setUserMode = (data) => (dispatch) => {
  dispatch({
    type: USERMODE,
    payload: data,
  });
};
export const setIsSeller = (data) => (dispatch) => {
  dispatch({
    type: ISSELLER,
    payload: data,
  });
};
export const setFreelancerId = (data) => (dispatch) => {
  dispatch({
    type: SETFREELANCERID,
    payload: data,
  });
};
export const setRole = (data) => (dispatch) => {
  dispatch({
    type: SETROLE,
    payload: data,
  });
};
export const setFreelancerData = (data) => (dispatch) => {
  dispatch({
    type: SETFREELANCERDATA,
    payload: data,
  });
};
export const setClientData = (data) => (dispatch) => {
  dispatch({
    type: SETCLIENTDATA,
    payload: data,
  });
};