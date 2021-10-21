import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import jwtDecode from "jwt-decode";

import {
  userRegisterReducer,
  userSignInReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
} from "../reducers/userReducer";

import { ticketRequestReducer } from "../reducers/ticketReducer";

const decodeLocalUser = () => {
  if (localStorage.getItem("user")) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const decodeToken = jwtDecode(userInfo.token);

    if (decodeToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("user");
      return null;
    } else {
      return userInfo;
    }
  }
};

const initialState = {
  userSignIn: {
    user: decodeLocalUser(),
  },
};

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
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
