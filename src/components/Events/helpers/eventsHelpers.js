import moment from 'moment';
import { months } from '../../../constants';

const getEvent = (events, id) => {
  const currentEvent = events.find(event => event.id === id);
  return currentEvent ? currentEvent.event : null;
};

export const getEventValues = (events, id) => {
  if (!events) { return null; }
  const event = getEvent(events, id);
  if (event) {
    return {
      name: event.name,
      startYear: event.startYear,
      startMonth: months[event.startMonth],
      startDay: event.startDay,
      startHours: event.startHours.toString(),
      startMinutes: event.startMinutes.toString(),
      endYear: event.endYear,
      endMonth: months[event.endMonth],
      endDay: event.endDay,
      endHours: event.endHours ? event.endHours.toString() : null,
      endMinutes: event.endMinutes ? event.endMinutes.toString() : null,
      description: event.description
    };
  }
  return null;
};

const createNewEvent = (event, id) => {
  const { startYear, startMonth, startDay, startHours, startMinutes } = event;
  const month = months.indexOf(startMonth);
  const date = moment([Number(startYear), month, Number(startDay), Number(startHours), Number(startMinutes)]);
  const newEventValues = {
    startYear: Number(startYear),
    startMonth: month,
    startDay: Number(startDay),
    startHours: startHours.toString(),
    startMinutes: startMinutes.toString(),
    name: event.name,
    endYear: event.endYear ? Number(event.endYear) : null,
    endMonth: event.endMonth ? Number(months.indexOf(event.endMonth)) : null,
    endDay: event.endDay ? Number(event.endDay) : null,
    endHours: event.endHours ? event.endHours.toString() : null,
    endMinutes: event.endMinutes ? event.endMinutes.toString() : null,
    description: event.description ? event.description : null
  };
  return { date, id, event: newEventValues };
};

const addNewEvent = (event, addEvent, eventId, changeId) => {
  const newEvent = createNewEvent(event, eventId, months);
  addEvent(newEvent);
  changeId(eventId);
  history.back();
};

const updateGivenEvent = (values, id, updateEvent) => {
  const newEvent = createNewEvent(values, id);
  updateEvent(newEvent);
  history.back();
};

export const returnToPreviousPage = () => {
  history.back();
};

export const formOnSubmit = (values, events, id, updateEvent, addEvent, eventId, changeId) => {
  const eventValues = getEventValues(events, id);
  return eventValues ?
    updateGivenEvent(values, id, updateEvent) :
    addNewEvent(values, addEvent, eventId, changeId);
};
