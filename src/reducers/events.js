import moment from 'moment';
import { ADD_EVENT, REMOVE_EVENT, CHANGE_ID } from '../constants/Events';

const initialState = {
  events: [{ date: moment([2017, 5, 5]), id: '15dd', event: { startYear: 2017, startMonth: 5, startDay: 5, startHours: 15, startMinutes: 15, name: 'Hello' } }],
  eventId: 1
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, events: action.payload };
    case REMOVE_EVENT:
      return { ...state, events: action.payload };
    case CHANGE_ID:
      return { ...state, eventId: action.payload };
    default:
      return state;
  }
}
