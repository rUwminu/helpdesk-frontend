import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAIL,
} from "../constant/ticketConstant";

export const getTicket = (data) => (dispatch) => {
  dispatch({ type: TICKET_REQUEST });

  try {
    dispatch({ type: TICKET_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: TICKET_FAIL, payload: err });
  }
};
