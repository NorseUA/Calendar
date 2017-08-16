import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { v4 } from 'node-uuid';
import * as styles from './Month.scss';
import { months, weekDayNames } from '../../constants';

export const setPreviousMonth = (year, setMonth, setYear, month, history) => {
  if (month === 0) {
    setMonth(11);
    setYear(year - 1);
    year -= 1;
    month = 11;
    history.replace(`/${year.toString()}/${months[11]}`);
  } else {
    setMonth(month - 1);
    month -= 1;
    const monthForHistory = months[month];
    history.push(monthForHistory);
  }
};

export const setNextMonth = (year, setMonth, setYear, month, history) => {
  if (month === 11) {
    setMonth(0);
    setYear(year + 1);
    year += 1;
    month = 0;
    history.replace(`/${year.toString()}/${months[month]}`);
  } else {
    setMonth(month + 1);
    month += 1;
    const monthForHistory = months[month];
    history.push(monthForHistory);
  }
};

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


export const getCurrentDate = (year, month) => {
  const currenntDate = moment([year, month, 1]);
  return currenntDate;
};


const dayHasEvents = (year, month, day, events) => {
  if (!events.length) {
    return false;
  }
  const date = moment([year, month, day]);
  const dayEvents = events.some((event) => {
    const eventDate = moment([event.event.startYear, event.event.startMonth, event.event.startDay]);
    return date.isSame(eventDate);
  });
  return dayEvents;
};


const getDayEvents = (year, month, day, events) => {
  const dayEvents = [];
  const date = moment([year, month, day]);
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (date.isSame(moment([events[i].event.startYear, events[i].event.startMonth, events[i].event.startDay]))) {
        dayEvents.push(events[i]);
      }
    }
    return dayEvents.length ? dayEvents : false;
  }
  return false;
};

const compareEventTime = (a, b) => {
  a.date.isAfter(b.date);
};

const dayIsToday = (year, month, day) => {
  const today = moment().startOf('day');
  const date = moment([year, month, day]);
  let style = 'regularDay';
  if (today.isSame(date)) {
    style = 'currentDay';
  }
  return style;
};

const renderDayEvents = (year, month, day, events) => {
  const dayEvents = getDayEvents(year, month, day, events) || [];
  const sortedDayEvents = dayEvents.sort(compareEventTime) || [];
  return sortedDayEvents.map((event) => {
    const dayEvent = event.event;
    const currentEvents = (<div className={styles.dayEvents} key={v4()}>
      <div>{`${dayEvent.startHours}:${dayEvent.startMinutes} `}{dayEvent.name}</div></div>);
    return currentEvents;
  });
};

const renderFullDay = (year, month, day, events, style) => {
  const hasEvents = dayHasEvents(year, month, day, events);
  const isToday = dayIsToday(year, month, day);
  return (<Link
    to={{ pathname: `/${year}/${months[month]}/${day}` }}
    className={cx(styles[style], styles[isToday], { [styles.hasEvent]: hasEvents })}
    key={v4()}
  >
    <div className={styles.dayTitle}>
      <div className={styles.monthTitle}>
        <div className={styles.monthTitleMonth}>{`${months[month]}, `}</div>
        <div>{day}</div>
      </div>
    </div>
    <div className={styles.dayEvents}>{renderDayEvents(year, month, day, events)}</div>
  </Link>);
};

const renderDay = (year, month, day, events, style) => {
  const hasEvents = dayHasEvents(year, month, day, events);
  const isToday = dayIsToday(year, month, day);
  return (<Link
    to={{ pathname: `/${year}/${months[month]}/${day}` }}
    className={cx(styles[style], styles[isToday], { [styles.hasEvent]: hasEvents })}
    key={v4()}
  >
    {day}
  </Link>);
};

const renderDays = (days, year, month, events, style, fullDay) => {
  const oneDay = days.map(day => (fullDay ?
    renderFullDay(year, month, day, events, style) :
    renderDay(year, month, day, events, style)
  ));
  return oneDay;
};

export const renderPreviousMonthDays = (year, month, events) => {
  const currentDate = getCurrentDate(year, month) || {};
  const days = getPreviousMonthDays(currentDate) || [];
  if (month === 0) {
    month = 11;
    year -= 1;
  } else {
    month -= 1;
  }
  return renderDays(days, year, month, events, 'disabled');
};

export const renderCurrentMonthDays = (year, month, events) => {
  const currentDate = getCurrentDate(year, month) || {};
  const days = getCurrentMonthDays(currentDate) || [];
  return renderDays(days, year, month, events, 'normal');
};

export const renderNextMonthDays = (year, month, events) => {
  const currentDate = getCurrentDate(year, month) || {};
  const days = getNextMonthDays(currentDate) || [];
  if (month === 11) {
    year += 1;
    month = 0;
  } else {
    month += 1;
  }
  return renderDays(days, year, month, events, 'disabled');
};

export const renderWeekDay = () => {
  const weekDays = weekDayNames.map(item =>
    (<div className={styles.weekDayItem} key={v4()}> {item} </div>));
  return weekDays;
};

export const renderPreviousMonthDaysFullView = (year, month, events) => {
  const currentDate = getCurrentDate(year, month) || {};
  const days = getPreviousMonthDays(currentDate) || [];
  if (month === 0) {
    month = 11;
    year -= 1;
  } else {
    month -= 1;
  }
  return renderDays(days, year, month, events, 'disabled', true);
};

export const renderCurrentMonthDaysFullView = (year, month, events) => {
  const currentDate = getCurrentDate(year, month) || {};
  const days = getCurrentMonthDays(currentDate) || [];
  return renderDays(days, year, month, events, 'normal', true);
};

export const renderNextMonthDaysFullView = (year, month, events) => {
  const currentDate = getCurrentDate(year, month) || {};
  const days = getNextMonthDays(currentDate) || [];
  if (month === 11) {
    year += 1;
    month = 0;
  } else {
    month += 1;
  }
  return renderDays(days, year, month, events, 'disabled', true);
};
