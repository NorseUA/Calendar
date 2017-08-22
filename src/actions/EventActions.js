import {
  ADD_EVENT_FULFILLED,
  ADD_EVENT_PENDING,
  ADD_EVENT_REJECTED,
  REMOVE_EVENT_FULFILLED,
  REMOVE_EVENT_PENDING,
  REMOVE_EVENT_REJECTED,
  GET_EVENTS_FULFILLED,
  GET_EVENTS_PENDING,
  GET_EVENTS_REJECTED,
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_REJECTED,
  CHANGE_ID,
  SET_CONFIRM_MODAL_STATE
} from '../constants/Events';
import { loadState, saveState } from '../localStorage';
import mockRequest from './helper';
import store from '../index';

export function addEvent(event) {
  return (dispatch) => {
    dispatch({ type: ADD_EVENT_PENDING, payload: event });
    mockRequest().then(() => {
      saveState(store.getState());
      dispatch({ type: ADD_EVENT_FULFILLED });
    })
      .catch(() => {
        dispatch({ type: ADD_EVENT_REJECTED, payload: true });
      });
  };
}

export function removeEvent(event) {
  return (dispatch) => {
    dispatch({ type: REMOVE_EVENT_PENDING, payload: event });
    mockRequest().then(() => {
      saveState(store.getState());
      dispatch({ type: SET_CONFIRM_MODAL_STATE, payload: false });
      dispatch({ type: REMOVE_EVENT_FULFILLED });
    })
      .catch(() => {
        dispatch({ type: SET_CONFIRM_MODAL_STATE, payload: false });
        dispatch({ type: REMOVE_EVENT_REJECTED, payload: true });
      });
  };
}

export function updateEvent(event) {
  return (dispatch) => {
    dispatch({ type: UPDATE_EVENT_PENDING, payload: event });
    mockRequest().then(() => {
      saveState(store.getState());
      dispatch({ type: UPDATE_EVENT_FULFILLED });
    })
      .catch(() => {
        dispatch({ type: UPDATE_EVENT_REJECTED, payload: true });
      });
  };
}

export function getEvents(events) {
  return (dispatch) => {
    dispatch({ type: GET_EVENTS_PENDING, payload: events });
    mockRequest().then(() => {
      const newState = loadState() || store.getState();
      const newEvents = newState.getEvents.events;
      if (newEvents.length) {
        const id = newState.getEvents.eventId - 1;
        dispatch({ type: CHANGE_ID, payload: id });
      }
      dispatch({ type: GET_EVENTS_FULFILLED, payload: newEvents });
    })
      .catch((error) => {
        dispatch({ type: GET_EVENTS_REJECTED, payload: error });
      });
  };
}


export function setConfirmModalState(state) {
  return {
    type: SET_CONFIRM_MODAL_STATE,
    payload: state
  };
}

export function changeId(eventId) {
  return {
    type: CHANGE_ID,
    payload: eventId
  };
}
