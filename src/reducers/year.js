import SET_YEAR from '../constants/Year';

const initialState = {
  year: 2017
};

export default function year(state = initialState, action) {
  switch (action.type) {
    case SET_YEAR:
      return { ...state, year: action.payload };
    default:
      return state;
  }
}
