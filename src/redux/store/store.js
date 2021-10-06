import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  userRegisterReducer,
  userSingInReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducer";

import { ticketRequestReducer } from "../reducers/ticketReducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const reducer = combineReducers({
  userSignIn: userSingInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  ticketList: ticketRequestReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
