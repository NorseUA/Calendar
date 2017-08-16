import moment from 'moment';
import { ADD_EVENT, REMOVE_EVENT, CHANGE_ID, UPDATE_EVENT } from '../constants/Events';

const initialState = {
  events: [{ date: moment([2017, 5, 5, 15, 15]), id: 0, event: { startYear: 2017, startMonth: 5, startDay: 5, startHours: 15, startMinutes: 15, name: 'Hello', endYear: 2017, endMonth: 5, endDay: 5, endHours: 15, endMinutes: 20, description: 'my first event' } }],
  eventId: 1
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT: {
      const newEvents = [...state.events];
      newEvents.push(action.payload);
      return { ...state, events: newEvents };
    }
    case REMOVE_EVENT:
      return { ...state, events: action.payload };
    case CHANGE_ID:
      return { ...state, eventId: action.payload + 1 };
    case UPDATE_EVENT: {
      const newEvents = [...state.events];
      newEvents.forEach((event, index) => {
        if (event.id === action.payload.id) {
          newEvents[index] = action.payload;
        }
      });
      return { ...state, events: newEvents };
    }
    default:
      return state;
  }
}
