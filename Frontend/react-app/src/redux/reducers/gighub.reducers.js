import { USERMODE,ISSELLER, SETFREELANCERID,SETROLE } from "../types/gighub.types";

const INITIAL_STATE = {
  userMode:"client",
  isSeller:true,
  freelancerId:'',
  role:"buyer"
};

const gighubReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERMODE:
      return {
        ...state,
        userMode: action.payload,
      };
    case ISSELLER:
      return {
        ...state,
        isSeller: action.payload,
      };
    case SETFREELANCERID:
      return {
        ...state,
        freelancerId: action.payload,
      };
    case SETROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default gighubReducer;
