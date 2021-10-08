import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAIL,
  IS_URGENT_TRUE,
  IS_URGENT_FALSE,
  FILTER_BY_DEPARMENT,
  CLEAR_ALL_STATE,
} from "../constant/ticketConstant";

export const ticketRequestReducer = (
  state = { filterType: [], tickets: [] },
  action
) => {
  switch (action.type) {
    case TICKET_REQUEST:
      return { ...state, loading: true };
    case TICKET_SUCCESS:
      return { ...state, loading: false, tickets: action.payload };
    case TICKET_FAIL:
      return { loading: false, error: action.payload };
    case IS_URGENT_TRUE:
      return { ...state, isUrgent: true };
    case IS_URGENT_FALSE:
      return { ...state, isUrgent: false };
    case FILTER_BY_DEPARMENT:
      const newType = action.payload;
      const existItem = state.filterType
        ? state.filterType.find((x) => x === newType)
        : null;

      if (existItem) {
        return {
          ...state,
          filterType: state.filterType.filter((x) => x !== newType),
        };
      } else {
        return {
          ...state,
          filterType: [...state.filterType, newType],
        };
      }
    case CLEAR_ALL_STATE:
      return { loading: true };
    default:
      return state;
  }
};
