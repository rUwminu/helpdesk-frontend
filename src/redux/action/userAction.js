import {
  USER_CREATE,
  USER_DELETE,
  USER_INFO,
  USER_LIST_ALL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constant/userConstant'

import { CLEAR_ALL_STATE } from '../constant/ticketConstant'

export const signin = (data) => (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  })

  try {
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('user', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: err,
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('user')

  dispatch({
    type: USER_SIGNOUT,
  })

  dispatch({
    type: CLEAR_ALL_STATE,
  })
}

export const getAllUser = (data) => (dispatch) => {
  dispatch({ type: USER_LIST_ALL, payload: data })
}

export const getSingleUser = (data) => (dispatch) => {
  dispatch({ type: USER_INFO, payload: data })
}

export const deleteUser = (userId) => (dispatch) => {
  dispatch({ type: USER_DELETE, payload: userId })
}

export const register = (data) => (dispatch) => {
  dispatch({ type: USER_CREATE, payload: data })
}
