import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from './userInfo.js';


const reducer = combineReducers({
    user: userReducer
});
  
const store = createStore(reducer, applyMiddleware(thunk));
  
export default store;