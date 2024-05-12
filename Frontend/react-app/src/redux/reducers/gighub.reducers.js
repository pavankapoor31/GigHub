import { USERMODE,ISSELLER } from "../types/gighub.types";

const INITIAL_STATE = {
  userMode:"client",
  isSeller:true
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
    default:
      return state;
  }
};

export default gighubReducer;
