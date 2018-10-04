import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import SET_DAY from '../../constants/Day';
import day from '../day';

const initialState = {
  day: 1
};

describe('reducers/day', () => {
  it('should have initial state', () => {
    expect(day()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(day).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should set day', () => {
    const newDay = 2;
    const action = { type: SET_DAY, payload: newDay };
    Reducer(day).expect(action).toReturnState({ ...initialState, day: newDay });
  });

  it('should store setted day and override existing day', () => {
    const existingState = Immutable({ ...initialState, day: 3 });
    const newDay = 5;
    const action = { type: SET_DAY, payload: newDay };
    Reducer(day).withState(existingState).expect(action).toReturnState({ ...initialState, day: newDay });
  });
});
