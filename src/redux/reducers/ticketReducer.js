import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAIL,
  IS_URGENT_TRUE,
  IS_URGENT_FALSE,
  IS_RESOLVED_TRUE,
  IS_RESOLVED_FALSE,
  FILTER_BY_DEPARMENT,
  CLEAR_ALL_STATE,
  UPDATE_RESOLVED,
  DELETE_TICKET,
} from '../constant/ticketConstant'

import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from '../constant/commentConstant'

export const ticketRequestReducer = (
  state = { filterType: [], tickets: [], resolved: false },
  action
) => {
  switch (action.type) {
    case TICKET_REQUEST:
      return { ...state, loading: true }
    case TICKET_SUCCESS:
      return { ...state, loading: false, tickets: action.payload }
    case TICKET_FAIL:
      return { loading: false, error: action.payload }
    case IS_URGENT_TRUE:
      return { ...state, isUrgent: true }
    case IS_URGENT_FALSE:
      return { ...state, isUrgent: false }
    case IS_RESOLVED_TRUE:
      return { ...state, resolved: true }
    case IS_RESOLVED_FALSE:
      return { ...state, resolved: false }
    case UPDATE_RESOLVED:
      const updateTicketResolve = state.tickets.find(
        (x) => x.id === action.payload.id
      )

      if (updateTicketResolve) {
        const updateResolved = {
          ...updateTicketResolve,
          isResolved: action.payload.isResolved,
        }

        return {
          ...state,
          tickets: state.tickets.map((x) =>
            x.id === action.payload.id ? updateResolved : x
          ),
        }
      }
      return
    case FILTER_BY_DEPARMENT:
      const newType = action.payload
      const existItem = state.filterType
        ? state.filterType.find((x) => x === newType)
        : null

      if (existItem) {
        return {
          ...state,
          filterType: state.filterType.filter((x) => x !== newType),
        }
      } else {
        return {
          ...state,
          filterType: [...state.filterType, newType],
        }
      }
    case CREATE_COMMENT_SUCCESS:
      const newComment = {
        id: action.payload.ticketId,
        username: action.payload.username,
        body: action.payload.body,
        createdAt: action.payload.createdAt,
      }
      const ticket = state.tickets.find((x) => x.id === action.payload.ticketId)

      if (ticket) {
        const updatedTicket = {
          ...ticket,
          comments: [...ticket.comments, newComment],
        }
        return {
          ...state,
          tickets: state.tickets.map((x) =>
            x.id === newComment.id ? updatedTicket : x
          ),
        }
      }
      return
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((x) => x.id !== action.payload),
      }
    case CLEAR_ALL_STATE:
      return { loading: true }
    default:
      return state
  }
}
