import SET_DAY from '../../constants/Day';
import * as actions from '../DayActions';

describe('action setDay', () => {
  it('should create an action to set day', () => {
    const expected = { type: SET_DAY, payload: 2 };
    expect(actions.setDay(2)).toEqual(expected);
  });
});
