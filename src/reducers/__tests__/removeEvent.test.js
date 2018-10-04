import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import removeEvent from '../events/removeEvent';

import {
  REMOVE_EVENT_FULFILLED,
  REMOVE_EVENT_PENDING,
  REMOVE_EVENT_REJECTED,
  REMOVE_EVENT_RETURN_TO_INITIAL_STATE
} from '../../constants/Events';

const initialState = {
  pending: false,
  received: false,
  error: null
};

describe('reducers/events/removeEvent', () => {
  it('should have initial state', () => {
    expect(removeEvent()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(removeEvent)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should set pending to true on pending', () => {
    const action = { type: REMOVE_EVENT_PENDING };
    Reducer(removeEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: true });
  });

  it('should set pending state to false and received state to true on fulfilled', () => {
    const action = { type: REMOVE_EVENT_FULFILLED };
    Reducer(removeEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: true });
  });

  it('should set pending and received state to false, and set error on rejected', () => {
    const action = { type: REMOVE_EVENT_REJECTED, payload: 'Some error' };
    Reducer(removeEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: false, error: action.payload });
  });

  it('should set existing state to initial state on return to initial state', () => {
    const existingState = Immutable({ ...initialState, error: 'Some error', received: true });
    const action = { type: REMOVE_EVENT_RETURN_TO_INITIAL_STATE };
    Reducer(removeEvent)
      .withState(existingState)
      .expect(action)
      .toReturnState(initialState);
  });
});
