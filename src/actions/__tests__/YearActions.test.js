import SET_YEAR from '../../constants/Year';
import * as actions from '../YearActions';

describe('action setYear', () => {
  it('should create an action to set month', () => {
    const expected = { type: SET_YEAR, payload: 2018 };
    expect(actions.setYear(2018)).toEqual(expected);
  });
});
