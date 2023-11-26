import { combineReducers, createStore } from "redux";
import user from "./reducers/user";
import loader from "./reducers/loader";

const combine=combineReducers({
    user:user,
    loader:loader
})
const store=createStore(combine)
export default store