const initialState = {
  year: 2017
};

export default function year(state = initialState, action) {
  switch (action.type) {
    case 'SET_NEXT_YEAR':
      return { ...state, year: action.payload };
    case 'SET_PREVIOUS_YEAR':
      return { ...state, year: action.payload };
    default:
      return state;
  }
}
