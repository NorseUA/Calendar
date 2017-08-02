import SET_YEAR from '../constants/Year';

export function setYear(year) {
  return {
    type: SET_YEAR,
    payload: year
  };
}

export function setNextYear(year) {
  return {
    type: SET_YEAR,
    payload: year
  };
}

