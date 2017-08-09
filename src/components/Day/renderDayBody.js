import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as styles from './Day.scss';

const getDayEvents = (year, month, day, events) => {
  const dayEvents = [];
  const date = moment([year, month, day]);
  for (let i = 0; i < events.length; i++) {
    const { event } = events[i];
    const eventDate = moment([event.startYear, event.startMonth, event.startDay]);
    if (date.isSame(eventDate)) {
      dayEvents.push(events[i]);
    }
  }
  return dayEvents;
};

const compareEventTime = (a, b) => {
  a.date.isAfter(b.date);
};

const renderEvent = (month, months, day, dayEvent) =>
  (<div className={styles.events} key={`h${dayEvent.name}${dayEvent.startMinutes}`}>
    {`${dayEvent.startHours}:${dayEvent.startMinutes}`}
    <Link
      to={{ pathname: `/${months[month]}/${day}/event/${dayEvent.id}` }}
      className={styles.eventName}
    >
      <div className={styles.dayEvent}>{dayEvent.name}</div>
    </Link>
  </div>);

const sortDayEvents = dayEvents => dayEvents.sort(compareEventTime);

const renderEvents = (sortedDayEvents, month, months, day) => {
  const sortedEvent = sortedDayEvents.map((event) => {
    const dayEvent = event.event;
    return renderEvent(month, months, day, dayEvent);
  });
  return sortedEvent;
};

const renderDayBody = (year, month, months, day, events) => {
  const dayEvents = getDayEvents(year, month, day, events);
  if (dayEvents.length) {
    const sortedDayEvents = sortDayEvents(dayEvents);
    return renderEvents(sortedDayEvents, month, months, day);
  }
  return dayEvents.length ? dayEvents : (<div className={styles.eventName}>You do not have any planned events</div>);
};

export default renderDayBody;
