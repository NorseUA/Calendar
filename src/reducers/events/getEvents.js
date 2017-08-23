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
  error: null,
  addReceived: false,
  addError: null,
  removeReceived: false,
  removeError: null,
  updateReceived: false,
  updateError: null
};

export default function getEvents(state = initialState, action) {
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
        received: true,
        addReceived: false,
        addError: null,
        updateReceived: false,
        updateError: null,
        removeReceived: false,
        removeError: null
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
        eventId: action.payload + 1
      };
    }
    default:
      return state;
  }
}
