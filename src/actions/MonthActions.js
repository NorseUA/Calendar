import SET_MONTH from '../constants/Month';

export function setMonth(month) { // eslint-disable-line
  return {
    type: SET_MONTH,
    payload: month
  };
}
