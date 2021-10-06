import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAIL,
} from "../constant/ticketConstant";

export const ticketRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_REQUEST:
      return { loading: true };
    case TICKET_SUCCESS:
      return { loading: false, tickets: action.payload };
    case TICKET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
