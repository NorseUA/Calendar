import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import addEvent from '../events/addEvent';
import {
  ADD_EVENT_FULFILLED,
  ADD_EVENT_PENDING,
  ADD_EVENT_REJECTED,
  ADD_EVENT_RETURN_TO_INITIAL_STATE
} from '../../constants/Events';

const initialState = {
  pending: false,
  received: false,
  error: null
};


describe('reducers/events/addEvent', () => {
  it('should have initial state', () => {
    expect(addEvent()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(addEvent).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should set pending to true on pending', () => {
    const action = { type: ADD_EVENT_PENDING };
    Reducer(addEvent).expect(action).toReturnState({ ...initialState, pending: true });
  });

  it('should set pending state to false and received state to true on fulfilled', () => {
    const action = { type: ADD_EVENT_FULFILLED };
    Reducer(addEvent).expect(action).toReturnState({ ...initialState, pending: false, received: true });
  });

  it('should set pending and received state to false, and set error on rejected', () => {
    const action = { type: ADD_EVENT_REJECTED, payload: 'Some error' };
    Reducer(addEvent)
      .expect(action)
      .toReturnState({ ...initialState, pending: false, received: false, error: action.payload });
  });

  it('should set existing state to initial state on return to initial state', () => {
    const existingState = Immutable({ ...initialState, error: 'Some error', received: true });
    const action = { type: ADD_EVENT_RETURN_TO_INITIAL_STATE };
    Reducer(addEvent).withState(existingState).expect(action).toReturnState(initialState);
  });
});
