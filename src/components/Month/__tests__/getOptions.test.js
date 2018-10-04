import {
  setNextMonth,
  setPreviousMonth
} from './../getOptions';

describe('getOptions, functions setNextMonth, setPreviousMonth ', () => {
  const setMonth = jest.fn();
  const setYear = jest.fn();
  const history = {
    push: jest.fn(),
    replace: jest.fn()
  };

  it('setNextMonth with month 11 sets month 0 and next year', () => {
    setNextMonth(2017, setMonth, setYear, 11, history);
    expect(setMonth).toHaveBeenCalledWith(0);
    expect(setYear).toHaveBeenCalledWith(2018);
    expect(history.replace).toHaveBeenCalledWith('/2018/January');
  });

  it('setNextMonth with month 9 ', () => {
    setNextMonth(2017, setMonth, setYear, 9, history);
    expect(setMonth).toHaveBeenCalledWith(10);
    expect(history.push).toHaveBeenCalledWith('November');
  });

  it('setPreviousMonth with month 0 sets month 11 and previous year', () => {
    setPreviousMonth(2017, setMonth, setYear, 0, history);
    expect(setMonth).toHaveBeenCalledWith(11);
    expect(setYear).toHaveBeenCalledWith(2016);
    expect(history.replace).toHaveBeenCalledWith('/2016/December');
  });

  it('setPreviousMonth with month 9 ', () => {
    setPreviousMonth(2017, setMonth, setYear, 9, history);
    expect(setMonth).toHaveBeenCalledWith(8);
    expect(history.push).toHaveBeenCalledWith('September');
  });
});
