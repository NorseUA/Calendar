import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import getEvents from '../events/getEvents';

import {
  GET_EVENTS_FULFILLED,
  GET_EVENTS_PENDING,
  GET_EVENTS_REJECTED,
  UPDATE_GENERAL_EVENTS,
  UPDATE_GENERAL_EVENTS_ID
} from '../../constants/Events';

const initialState = {
  events: [],
  eventId: 0,
  pending: false,
  recieved: false,
  error: null
};


describe('reducers/events/getEvents', () => {
  it('should have initial state', () => {
    expect(getEvents()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(getEvents).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should set pending to true and received to false on pending', () => {
    const action = { type: GET_EVENTS_PENDING };
    Reducer(getEvents)
      .expect(action)
      .toReturnState({ ...initialState, pending: true, received: false });
  });

  it('should  get events, set pending state to false and received state to true on fulfilled', () => {
    const action = { type: GET_EVENTS_FULFILLED, payload: [{ date: 'some date', eventId: 0, event: {} }] };
    Reducer(getEvents)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: true, events: action.payload });
  });

  it('should set pending and received state to false, and set error on rejected', () => {
    const action = { type: GET_EVENTS_REJECTED, payload: 'Some error' };
    Reducer(getEvents)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: false, error: action.payload });
  });

  it('should set existing state to initial state on return to initial state', () => {
    const existingState = Immutable({ ...initialState, events: [{ date: 'some date', eventId: 0, event: {} }] });
    const action = {
      type: GET_EVENTS_FULFILLED,
      payload: [{ date: 'some date', eventId: 0, event: {} }, { date: 'other date', eventId: 2, event: {} }]
    };
    Reducer(getEvents)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: true, events: action.payload });
  });

  it('should update existing events', () => {
    const existingState = Immutable({ ...initialState, events: [{ date: 'some date', eventId: 0, event: {} }] });
    const action = {
      type: UPDATE_GENERAL_EVENTS,
      payload: [{ date: 'some date', eventId: 0, event: {} }, { date: 'other date', eventId: 2, event: {} }]
    };
    Reducer(getEvents)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, events: action.payload });
  });

  it('should update existing eventId', () => {
    const existingState = Immutable({ ...initialState, eventId: 2 });
    const action = { type: UPDATE_GENERAL_EVENTS_ID, payload: 5 };
    Reducer(getEvents)
    .withState(existingState)
    .expect(action)
    .toReturnState({ ...initialState, eventId: action.payload });
  });
});
