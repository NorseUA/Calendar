import React from 'react';
import moment from 'moment';
import { v4 } from 'node-uuid';
import { Link } from 'react-router-dom';
import * as styles from './Day.scss';
import { months } from '../../constants';

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

const compareEventTime = (a, b) => moment(moment(a.date)).isAfter(moment(moment(b.date)));

const renderEvent = (year, month, day, dayEvent, id) =>
  (<div className={styles.events} key={v4()}>
    {`${dayEvent.startHours}:${dayEvent.startMinutes}`}
    <Link
      to={{ pathname: `/${year}/${months[month]}/${day}/event/${id}` }}
      className={styles.eventName}
    >
      <div className={styles.dayEvent}>{dayEvent.name}</div>
    </Link>
  </div>);

const sortDayEvents = dayEvents => dayEvents.sort(compareEventTime);

const renderEvents = (sortedDayEvents, year, month, day) => {
  const sortedEvent = sortedDayEvents.map((event) => {
    const dayEvent = event.event;
    return renderEvent(year, month, day, dayEvent, event.id);
  });
  return sortedEvent;
};

const renderDayBody = (year, month, day, events) => {
  const dayEvents = getDayEvents(year, month, day, events);
  if (dayEvents.length) {
    const sortedDayEvents = sortDayEvents(dayEvents);
    return renderEvents(sortedDayEvents, year, month, day);
  }
  return dayEvents.length ? dayEvents : (<div className={styles.eventName}>You do not have any planned events</div>);
};

export default renderDayBody;
