import { ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT, CHANGE_ID } from '../constants/Events';

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: event
  };
}
export function removeEvent(events) {
  return {
    type: REMOVE_EVENT,
    payload: events
  };
}
export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event
  };
}
export function changeId(eventId) {
  return {
    type: CHANGE_ID,
    payload: eventId
  };
}

