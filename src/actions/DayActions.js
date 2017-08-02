import SET_DAY from '../constants/Day';

export function setDay(day) {
  return {
    type: SET_DAY,
    payload: day
  };
}
export function setNextDay(day) {
  return {
    type: SET_DAY,
    payload: day
  };
}
