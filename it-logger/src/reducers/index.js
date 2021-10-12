import { combineReducers } from "redux";
import logreducer from "./logreducer";
import techReducers from "./techReducers";
export default combineReducers({
log :logreducer,
tech :techReducers
});