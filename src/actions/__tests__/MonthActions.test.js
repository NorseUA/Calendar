import SET_MONTH from '../../constants/Month';
import * as actions from '../MonthActions';

describe('action setMonth', () => {
  it('should create an action to set month', () => {
    const expected = { type: SET_MONTH, payload: 2 };
    expect(actions.setMonth(2)).toEqual(expected);
  });
});
