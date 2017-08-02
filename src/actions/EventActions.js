import { ADD_EVENT, REMOVE_EVENT } from '../constants/Events';

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: event
  };
}
export function removeEvent(event) {
  return {
    type: REMOVE_EVENT,
    payload: event
  };
}
