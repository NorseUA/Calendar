import {
  setNextDay,
  setPreviousDay
} from './../dayHelpers';

describe('dayHelpers, functions setNextDay, setPreviousDay ', () => {
  const setMonth = jest.fn();
  const setYear = jest.fn();
  const setDay = jest.fn();

  it('setNextDay with day 31 month 11 sets month 0 and next year', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    setNextDay(2017, 11, 31, history, setDay, setMonth, setYear);
    expect(setMonth).toHaveBeenCalledWith(0);
    expect(setYear).toHaveBeenCalledWith(2018);
    expect(setDay).toHaveBeenCalledWith(1);
    expect(history.replace).toHaveBeenCalledWith('/2018/January/1');
  });

  it('setNextDay with simple case ', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    setNextDay(2017, 10, 20, history, setDay, setMonth, setYear);
    expect(setDay).toHaveBeenCalledWith(21);
    expect(history.push).toHaveBeenCalledWith('21');
  });
  it('setNextDay, case last day in month', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    setNextDay(2017, 0, 31, history, setDay, setMonth, setYear);
    expect(setDay).toHaveBeenCalledWith(1);
    expect(setMonth).toHaveBeenCalledWith(1);
    expect(history.replace).toHaveBeenCalledWith('/2017/February/1');
  });

  it('setPreviousDay with day 1 month 0 sets month 11 and previous year', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    setPreviousDay(2017, 0, 1, history, setDay, setMonth, setYear);
    expect(setMonth).toHaveBeenCalledWith(11);
    expect(setYear).toHaveBeenCalledWith(2016);
    expect(setDay).toHaveBeenCalledWith(31);
    expect(history.replace).toHaveBeenCalledWith('/2016/December/31');
  });

  it('setPreviousDay simple case', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    setPreviousDay(2017, 10, 20, history, setDay, setMonth, setYear);
    expect(setDay).toHaveBeenCalledWith(19);
    expect(history.push).toHaveBeenCalledWith('19');
  });

  it('setPreviousDay, case first day in month', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    setPreviousDay(2017, 1, 1, history, setDay, setMonth, setYear);
    expect(setDay).toHaveBeenCalledWith(31);
    expect(setMonth).toHaveBeenCalledWith(0);
    expect(history.replace).toHaveBeenCalledWith('/2017/January/31');
  });
});
