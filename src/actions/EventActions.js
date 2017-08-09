import { ADD_EVENT, REMOVE_EVENT, CHANGE_EVENTS_MAP, CHANGE_ID } from '../constants/Events';

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
export function changeEventsMap(eventsMap) {
  return {
    type: CHANGE_EVENTS_MAP,
    payload: eventsMap
  };
}
export function changeId(eventId) {
  return {
    type: CHANGE_ID,
    payload: eventId
  };
}

