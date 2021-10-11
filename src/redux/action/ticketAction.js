import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from '../constant/commentConstant'
import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAIL,
  IS_URGENT_TRUE,
  IS_URGENT_FALSE,
  FILTER_BY_DEPARMENT,
} from '../constant/ticketConstant'

export const getTicket = (data) => (dispatch) => {
  dispatch({ type: TICKET_REQUEST })

  try {
    dispatch({ type: TICKET_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: TICKET_FAIL, payload: err })
  }
}

export const filterTicketsUrgent = (isUrgent) => (dispatch) => {
  if (isUrgent) {
    dispatch({ type: IS_URGENT_TRUE })
  } else if (!isUrgent) {
    dispatch({ type: IS_URGENT_FALSE })
  }
}

export const filterTicketsByDeparment = (type) => (dispatch) => {
  dispatch({ type: FILTER_BY_DEPARMENT, payload: type })
}

export const createNewComment = (data) => (dispatch) => {
  dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data })
}
