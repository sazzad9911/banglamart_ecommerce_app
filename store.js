import { combineReducers, createStore } from "redux";
import user from "./reducers/user";
import loader from "./reducers/loader";
import deliverData from "./reducers/dataDeliver";

const combine=combineReducers({
    user:user,
    loader:loader,
    deliverData:deliverData
})
const store=createStore(combine)
export default store