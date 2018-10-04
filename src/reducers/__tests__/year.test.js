import moment from 'moment';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';
import SET_YEAR from '../../constants/Year';
import year from '../year';

const initialState = {
  year: moment().year()
};

describe('reducers/year', () => {
  it('should have initial state', () => {
    expect(year()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(year).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should set year', () => {
    const newYear = 2018;
    const action = { type: SET_YEAR, payload: newYear };
    Reducer(year).expect(action).toReturnState({ ...initialState, year: newYear });
  });

  it('should store setted year and override existing year', () => {
    const existingState = Immutable({ ...initialState, year: 2020 });
    const newYear = 2021;
    const action = { type: SET_YEAR, payload: newYear };
    Reducer(year).withState(existingState).expect(action).toReturnState({ ...initialState, year: newYear });
  });
});
