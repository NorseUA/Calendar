export function setNextMonth(month) {
  return {
    type: 'SET_NEXT_MONTH',
    payload: month
  };
}

export function setPreviousMonth(month) {
  return {
    type: 'SET_PREVIOUS_MONTH',
    payload: month
  };
}
