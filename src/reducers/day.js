import { SET_DAY } from '../constants/Day';

const initialState = {
  day: 1
};

export default function day(state = initialState, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.payload };
    default:
      return state;
  }
}
