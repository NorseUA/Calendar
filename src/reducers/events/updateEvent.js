import {
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_REJECTED,
  UPDATE_EVENT_RETURN_TO_INITIAL_STATE
} from '../../constants/Events';

const initialState = {
  pending: false,
  received: false,
  error: null
};

export default function updateEvent(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_EVENT_PENDING: {
      return {
        ...state,
        pending: true,
        received: false
      };
    }
    case UPDATE_EVENT_FULFILLED: {
      return {
        ...state,
        pending: false,
        received: true
      };
    }
    case UPDATE_EVENT_REJECTED: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        received: false
      };
    }
    case UPDATE_EVENT_RETURN_TO_INITIAL_STATE: {
      return {
        ...state,
        error: null,
        pending: false,
        received: false
      };
    }
    default:
      return state;
  }
}
