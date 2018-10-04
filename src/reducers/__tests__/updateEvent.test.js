import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import updateEvent from '../events/updateEvent';

import {
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_REJECTED,
  UPDATE_EVENT_RETURN_TO_INITIAL_STATE
} from '../../constants/Events';

const initialState = {
  pending: false,
  received: false,
  error: null
};

describe('reducers/events/updateEvent', () => {
  it('should have initial state', () => {
    expect(updateEvent()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(updateEvent)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should set pending to true on pending', () => {
    const action = { type: UPDATE_EVENT_PENDING };
    Reducer(updateEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: true });
  });

  it('should set pending state to false and received state to true on fulfilled', () => {
    const action = { type: UPDATE_EVENT_FULFILLED };
    Reducer(updateEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: true });
  });

  it('should set pending and received state to false, and set error on rejected', () => {
    const action = { type: UPDATE_EVENT_REJECTED, payload: 'Some error' };
    Reducer(updateEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: false, error: action.payload });
  });

  it('should set existing state to initial state on return to initial state', () => {
    const existingState = Immutable({ ...initialState, error: 'Some error', received: true });
    const action = { type: UPDATE_EVENT_RETURN_TO_INITIAL_STATE };
    Reducer(updateEvent)
      .withState(existingState)
      .expect(action)
      .toReturnState(initialState);
  });
});
