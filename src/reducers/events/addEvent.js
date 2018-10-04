import {
  ADD_EVENT_FULFILLED,
  ADD_EVENT_PENDING,
  ADD_EVENT_REJECTED,
  ADD_EVENT_RETURN_TO_INITIAL_STATE
} from '../../constants/Events';

const initialState = {
  pending: false,
  received: false,
  error: null
};

export default function addEvent(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_EVENT_PENDING: {
      return {
        ...state,
        pending: true
      };
    }
    case ADD_EVENT_FULFILLED: {
      return {
        ...state,
        pending: false,
        received: true
      };
    }
    case ADD_EVENT_REJECTED: {
      return {
        ...state,
        error: action.payload,
        pending: false,
        received: false
      };
    }
    case ADD_EVENT_RETURN_TO_INITIAL_STATE: {
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
