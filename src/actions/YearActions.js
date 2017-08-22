import SET_YEAR from '../constants/Year';

export function setYear(year) { // eslint-disable-line
  return {
    type: SET_YEAR,
    payload: year
  };
}

