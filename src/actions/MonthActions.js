import SET_MONTH from '../constants/Month';

export function setMonth(month) {
  return {
    type: SET_MONTH,
    payload: month
  };
}

export function setNextMonth(month) {
  return {
    type: SET_MONTH,
    payload: month
  };
}
