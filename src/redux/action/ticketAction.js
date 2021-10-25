import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_PROCESS,
} from "../constant/commentConstant";
import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAIL,
  IS_URGENT_TRUE,
  IS_URGENT_FALSE,
  FILTER_BY_DEPARMENT,
  IS_RESOLVED_TRUE,
  IS_RESOLVED_FALSE,
  UPDATE_RESOLVED,
  DELETE_TICKET,
  GET_ALL_TICKETS_TYPE_REQUEST,
  GET_ALL_TICKETS_TYPE_SUCCESS,
  GET_ALL_TICKETS_TYPE_FAIL,
} from "../constant/ticketConstant";

export const getTicket = (data) => (dispatch) => {
  dispatch({ type: TICKET_REQUEST });

  try {
    dispatch({ type: TICKET_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: TICKET_FAIL, payload: err });
  }
};

export const filterTicketsUrgent = (isUrgent) => (dispatch) => {
  if (isUrgent) {
    dispatch({ type: IS_URGENT_TRUE });
  } else if (!isUrgent) {
    dispatch({ type: IS_URGENT_FALSE });
  }
};

export const filterTicketsByDeparment = (type) => (dispatch) => {
  dispatch({ type: FILTER_BY_DEPARMENT, payload: type });
};

export const createNewComment = (data) => (dispatch) => {
  dispatch({ type: CREATE_COMMENT_PROCESS });

  if (data === "error") {
    dispatch({ type: CREATE_COMMENT_FAIL });
  } else {
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  }
};

export const toggleTicketIsResolved = (boo) => (dispatch) => {
  if (boo) {
    dispatch({ type: IS_RESOLVED_TRUE });
  } else if (!boo) {
    dispatch({ type: IS_RESOLVED_FALSE });
  }
};

export const updateTicketIsResolved = (data) => (dispatch) => {
  if (data) {
    dispatch({ type: UPDATE_RESOLVED, payload: data });
  }
};

export const deleteTicket = (id) => (dispatch) => {
  dispatch({ type: DELETE_TICKET, payload: id });
};

export const getAllTicketType = (data) => (dispatch) => {
  dispatch({ type: GET_ALL_TICKETS_TYPE_REQUEST });

  if (data) {
    dispatch({ type: GET_ALL_TICKETS_TYPE_SUCCESS, payload: data });
  } else {
    dispatch({ type: GET_ALL_TICKETS_TYPE_FAIL });
  }
};
