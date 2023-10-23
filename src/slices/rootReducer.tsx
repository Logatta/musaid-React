import { combineReducers } from "@reduxjs/toolkit";
import tokensReducer from "./tokensSlice";
import sideNavReducer from "./sideNavSlice";
const rootReducer = combineReducers({
  sideNav: sideNavReducer,
  tokens: tokensReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
