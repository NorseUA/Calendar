const initialState = {
  month: 3,
  weekDayNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
};

export default function month(state = initialState, action) {
  switch (action.type) {
    case 'SET_NEXT_MONTH':
      return { ...state, month: action.payload };
    case 'SET_PREVIOUS_MONTH':
      return { ...state, month: action.payload };
    default:
      return state;
  }
}
