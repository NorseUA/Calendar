import SET_DAY from '../constants/Day';

export function setDay(day) { // eslint-disable-line
  return {
    type: SET_DAY,
    payload: day
  };
}
