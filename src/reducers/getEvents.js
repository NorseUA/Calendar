
import {
  GET_EVENTS_FULFILLED,
  GET_EVENTS_PENDING,
  GET_EVENTS_REJECTED,
  ADD_EVENT_FULFILLED,
  ADD_EVENT_PENDING,
  ADD_EVENT_REJECTED,
  REMOVE_EVENT_FULFILLED,
  REMOVE_EVENT_PENDING,
  REMOVE_EVENT_REJECTED,
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_REJECTED,
  CHANGE_ID,
  SET_CONFIRM_MODAL_STATE
} from '../constants/Events';

const initialState = {
  events: [],
  eventId: 0,
  pending: false,
  recieved: false,
  error: null,
  addPending: false,
  addReceived: false,
  addError: null,
  removePending: false,
  removeReceived: false,
  removeError: null,
  updatePending: false,
  updateReceived: false,
  updateError: null,
  confirmIsOpen: false
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


    case ADD_EVENT_PENDING: {
      const newEvents = [...state.events];
      newEvents.push(action.payload);
      return {
        ...state,
        addPending: true,
        events: newEvents
      };
    }
    case ADD_EVENT_FULFILLED: {
      return {
        ...state,
        addPending: false,
        addReceived: true
      };
    }
    case ADD_EVENT_REJECTED: {
      return {
        ...state,
        addError: action.payload,
        addPending: false,
        addReceived: false
      };
    }


    case REMOVE_EVENT_PENDING: {
      const newEvents = [...state.events];
      const index = newEvents.findIndex(event => event.id === action.payload);
      newEvents.splice(index, 1);
      return {
        ...state,
        removePending: true,
        removeReceived: false,
        events: newEvents
      };
    }
    case REMOVE_EVENT_FULFILLED: {
      return {
        ...state,
        removePending: false,
        removeReceived: true
      };
    }
    case REMOVE_EVENT_REJECTED: {
      return {
        ...state,
        removeError: action.payload,
        removePending: false,
        removeReceived: false
      };
    }


    case UPDATE_EVENT_PENDING: {
      const newEvents = [...state.events];
      newEvents.forEach((event, index) => {
        if (event.id === action.payload.id) {
          newEvents[index] = action.payload;
        }
      });
      return {
        ...state,
        updatePending: true,
        updateReceived: false,
        events: newEvents
      };
    }
    case UPDATE_EVENT_FULFILLED: {
      return {
        ...state,
        updatePending: false,
        updateReceived: true
      };
    }
    case UPDATE_EVENT_REJECTED: {
      return {
        ...state,
        updateError: action.payload,
        updatePending: false,
        updateReceived: false
      };
    }


    case CHANGE_ID:
      return {
        ...state,
        eventId: action.payload + 1
      };

    case SET_CONFIRM_MODAL_STATE:
      return {
        ...state,
        confirmIsOpen: action.payload
      };

    default:
      return state;
  }
}
