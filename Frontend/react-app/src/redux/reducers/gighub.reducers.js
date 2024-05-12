import { USERMODE,ISSELLER, SETFREELANCERID,SETROLE, SETCLIENTDATA, SETFREELANCERDATA } from "../types/gighub.types";

const INITIAL_STATE = {
  userMode:"client",
  isSeller:true,
  freelancerId:'',
  role:"buyer",
  freelancerData: null,
  clientData: null,
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
    case SETCLIENTDATA:
      return {
        ...state,
        clientData: action.payload,
      };
    case SETFREELANCERDATA:
      return {
        ...state,
        freelancerData: action.payload,
      };
    default:
      return state;
  }
};

export default gighubReducer;
