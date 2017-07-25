const getWeekDayOfFirstDayInMonth = (currentDate) => {
  let weekDayOfFirstDay = currentDate.clone().weekday() - 1;
  if (weekDayOfFirstDay < 0) {
    weekDayOfFirstDay = 6;
  }
  return weekDayOfFirstDay;
};

export const getPreviousMonthDays = (currentDate) => {
  const previousMonthDays = [];
  const firstDayWeekDay = getWeekDayOfFirstDayInMonth(currentDate);
  let start = currentDate.clone().subtract(firstDayWeekDay, 'd').date();
  for (let i = 1; i <= firstDayWeekDay; i++) {
    previousMonthDays.push(start);
    start += 1;
  }
  return previousMonthDays;
};

export const getCurrentMonthDays = (currentDate) => {
  const allDaysInMonth = [];
  const days = currentDate.daysInMonth();
  for (let i = 1; i <= days; i++) {
    allDaysInMonth.push(i);
  }
  return allDaysInMonth;
};


export const getNextMonthDays = (currentDate) => {
  const lastDayWeekday = currentDate.clone().endOf('month').weekday() - 1;
  const nextMonthDays = [];
  for (let i = 1; i <= (6 - lastDayWeekday); i++) {
    nextMonthDays.push(i);
  }
  return nextMonthDays;
};
