import {
  GET_EVENTS_FULFILLED,
  GET_EVENTS_PENDING,
  GET_EVENTS_REJECTED,
  UPDATE_GENERAL_EVENTS,
  UPDATE_GENERAL_EVENTS_ID
} from '../../constants/Events';

const initialState = {
  events: [],
  eventId: 0,
  pending: false,
  recieved: false,
  error: null
};

export default function getEvents(state = initialState, action = {}) {
  switch (action.type) {
    case GET_EVENTS_PENDING: {
      return {
        ...state,
        pending: true,
        received: false
      };
    }
    case GET_EVENTS_FULFILLED: {
      return {
        ...state,
        events: action.payload,
        pending: false,
        received: true
      };
    }
    case GET_EVENTS_REJECTED: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        received: false
      };
    }
    case UPDATE_GENERAL_EVENTS: {
      return {
        ...state,
        events: action.payload
      };
    }
    case UPDATE_GENERAL_EVENTS_ID: {
      return {
        ...state,
        eventId: action.payload
      };
    }
    default:
      return state;
  }
}
