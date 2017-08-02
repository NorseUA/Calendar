import { SET_MONTH } from '../constants/Month';

const initialState = {
  weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut', 'Sun']
};

export default function month(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH:
      return { ...state, month: action.payload };
    default:
      return state;
  }
}
