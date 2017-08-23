import {
  REMOVE_EVENT_FULFILLED,
  REMOVE_EVENT_PENDING,
  REMOVE_EVENT_REJECTED,
  REMOVE_EVENT_RETURN_TO_INITIAL_STATE
} from '../../constants/Events';

const initialState = {
  pending: false,
  received: false,
  error: null
};

export default function removeEvent(state = initialState, action) {
  switch (action.type) {
    case REMOVE_EVENT_PENDING: {
      return {
        ...state,
        pending: true
      };
    }
    case REMOVE_EVENT_FULFILLED: {
      return {
        ...state,
        pending: false,
        received: true
      };
    }
    case REMOVE_EVENT_REJECTED: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        received: false
      };
    }
    case REMOVE_EVENT_RETURN_TO_INITIAL_STATE: {
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
