import { combineReducers } from "redux";
import gighub from "./reducers/gighub.reducers";

const rootReducer = combineReducers({
  gighub:gighub,
});

export default rootReducer;
