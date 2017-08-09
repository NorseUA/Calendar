import moment from 'moment';

export const getCurrentDate = (year, month, day) => moment([year, month, day]);

export const getDay = (year, month, day) => {
  const currentDate = getCurrentDate(year, month, day);
  return currentDate.format('MMMM, D dddd');
};

const getLastDayInCurrentMonth = (year, month, day) => {
  const currentDate = getCurrentDate(year, month, day);
  return currentDate.daysInMonth();
};

const getLastDay = (year, month, day) => {
  const currentDate = moment([year, month, day]);
  return currentDate.daysInMonth();
};

export const setPreviousDay = (year, month, months, day, history, setDay, setMonth, setYear) => {
  if (day === 1) {
    if (month === 0) {
      const lastDay = (getLastDay(year - 1, 11, 1));
      setDay(lastDay);
      setMonth(11);
      setYear(year - 1);
      day = lastDay;
      history.replace(`/${months[11]}/${day.toString()}`);
    } else {
      const lastDay = (getLastDay(year, month - 1, 1));
      setDay(lastDay);
      setMonth(month - 1);
      day = lastDay;
      history.replace(`/${months[month - 1]}/${day.toString()}`);
    }
  } else {
    setDay(day - 1);
    day -= 1;
    history.push(day.toString());
  }
};

export const setNextDay = (year, month, months, day, history, setDay, setMonth, setYear) => {
  const lastDay = getLastDayInCurrentMonth(year, month, day);
  if (day === lastDay) {
    if (month === 11) {
      setDay(1);
      setMonth(0);
      setYear(year + 1);
      day = 1;
      history.replace(`/${months[0]}/${day.toString()}`);
    } else {
      setDay(1);
      setMonth(month + 1);
      day = 1;
      history.replace(`/${months[month + 1]}/${day.toString()}`);
    }
  } else {
    setDay(day + 1);
    day += 1;
    history.push(day.toString());
  }
};
