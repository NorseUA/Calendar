import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import SET_MONTH from '../../constants/Month';
import month from '../month';

const initialState = {};

describe('reducers/month', () => {
  it('should have initial state', () => {
    expect(month()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(month).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should set month', () => {
    const newMonth = 2;
    const action = { type: SET_MONTH, payload: newMonth };
    Reducer(month).expect(action).toReturnState({ ...initialState, month: newMonth });
  });

  it('should store setted month and override existing month', () => {
    const existingState = Immutable({ ...initialState, month: 11 });
    const newMonth = 0;
    const action = { type: SET_MONTH, payload: newMonth };
    Reducer(month).withState(existingState).expect(action).toReturnState({ ...initialState, month: newMonth });
  });
});
