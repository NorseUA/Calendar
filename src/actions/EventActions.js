import {
  ADD_EVENT_FULFILLED,
  ADD_EVENT_PENDING,
  ADD_EVENT_REJECTED,
  ADD_EVENT_RETURN_TO_INITIAL_STATE,
  REMOVE_EVENT_FULFILLED,
  REMOVE_EVENT_PENDING,
  REMOVE_EVENT_REJECTED,
  REMOVE_EVENT_RETURN_TO_INITIAL_STATE,
  GET_EVENTS_FULFILLED,
  GET_EVENTS_PENDING,
  GET_EVENTS_REJECTED,
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_REJECTED,
  UPDATE_EVENT_RETURN_TO_INITIAL_STATE,
  SET_CONFIRM_MODAL_STATE,
  UPDATE_GENERAL_EVENTS,
  UPDATE_GENERAL_EVENTS_ID
} from '../constants/Events';
import { loadState, saveState } from '../services/localStorage';
import mockRequest from '../services/mockRequest';
import store from '../index';

const getState = () => {
  const state = loadState() || store.getState();
  return state;
};

export function addEvent(event) {
  return (dispatch) => {
    dispatch({ type: ADD_EVENT_PENDING });
    return mockRequest().then(() => {
      const state = getState();
      const persistedEvents = state.getEvents.events;
      const newEvents = persistedEvents.map(item => ({ ...item, event: { ...item.event } })).concat(event);
      const id = state.getEvents.eventId + 1;
      dispatch({ type: UPDATE_GENERAL_EVENTS, payload: newEvents });
      dispatch({ type: UPDATE_GENERAL_EVENTS_ID, payload: id });
      saveState(store.getState());
      dispatch({ type: ADD_EVENT_FULFILLED });
    })
      .catch(() => {
        dispatch({ type: ADD_EVENT_REJECTED, payload: true });
      });
  };
}

export function removeEvent(id) {
  return (dispatch) => {
    dispatch({ type: REMOVE_EVENT_PENDING });
    return mockRequest().then(() => {
      const state = getState();
      const persistedEvents = state.getEvents.events;
      const newEvents = persistedEvents.map(item => ({ ...item, event: { ...item.event } }));
      const index = newEvents.findIndex(event => event.id === id);
      newEvents.splice(index, 1);
      dispatch({ type: UPDATE_GENERAL_EVENTS, payload: newEvents });
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

export function updateEvent(newEvent) {
  return (dispatch) => {
    dispatch({ type: UPDATE_EVENT_PENDING });
    return mockRequest().then(() => {
      const state = getState();
      const persistedEvents = state.getEvents.events;
      const newEvents = persistedEvents.map((item) => {
        if (item.id === newEvent.id) {
          return newEvent;
        } else { // eslint-disable-line
          return ({ ...item, event: { ...item.event } });
        }
      });
      dispatch({ type: UPDATE_GENERAL_EVENTS, payload: newEvents });
      saveState(store.getState());
      dispatch({ type: UPDATE_EVENT_FULFILLED });
    })
      .catch(() => {
        dispatch({ type: UPDATE_EVENT_REJECTED, payload: true });
      });
  };
}


export function getEvents() {
  return (dispatch) => {
    dispatch({ type: GET_EVENTS_PENDING });
    return mockRequest().then(() => {
      const newState = loadState() || store.getState();
      const newEvents = newState.getEvents.events;
      dispatch({ type: ADD_EVENT_RETURN_TO_INITIAL_STATE });
      dispatch({ type: REMOVE_EVENT_RETURN_TO_INITIAL_STATE });
      dispatch({ type: UPDATE_EVENT_RETURN_TO_INITIAL_STATE });
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
