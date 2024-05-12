import { USERMODE } from "../types/gighub.types";

const INITIAL_STATE = {
  userMode:"client",
};

const rotaryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USERMODE:
      return {
        ...state,
        userMode: action.payload,
      };
    default:
      return state;
  }
};

export default rotaryReducer;
