import { SET_NEXT_YEAR, SET_PREVIOUS_YEAR } from '../constants/Year';

export function setNextYear(year) {
  return {
    type: SET_NEXT_YEAR,
    payload: year
  };
}

export function setPreviousYear(year) {
  return {
    type: SET_PREVIOUS_YEAR,
    payload: year
  };
}
