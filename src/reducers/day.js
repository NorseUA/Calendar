import { SET_NEXT_DAY, SET_PREVIOUS_DAY } from '../constants/Day';

const initialState = {
  day: 1
};

export default function day(state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_DAY:
      return { ...state, day: action.payload };
    case SET_PREVIOUS_DAY:
      return { ...state, day: action.payload };
    default:
      return state;
  }
}
