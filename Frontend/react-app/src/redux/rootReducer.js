import { combineReducers } from "redux";
import gighubReducer from "./reducers/gighub.reducers";

const rootReducer = combineReducers({
  gighubReducer:gighubReducer,
});

export default rootReducer;
