import SET_MONTH from '../constants/Month';

export default function month(state = {}, action = {}) {
  switch (action.type) {
    case SET_MONTH:
      return { ...state, month: action.payload };
    default:
      return state;
  }
}
