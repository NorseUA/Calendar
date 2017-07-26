import { SET_NEXT_DAY, SET_PREVIOUS_DAY } from '../constants/Day';

export function setNextDay(day) {
  return {
    type: SET_NEXT_DAY,
    payload: day
  };
}

export function setPreviousDay(day) {
  return {
    type: SET_PREVIOUS_DAY,
    payload: day
  };
}
