import { applyMiddleware } from "redux";

import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";
export default createStore(
  rootReducer,
);
