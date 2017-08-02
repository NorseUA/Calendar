import { ADD_EVENT, REMOVE_EVENT } from '../constants/Events';

const initialState = {
  events: [{ id: 123, year: 2017, month: 0, day: 1, start: '00:00', end: '01:00' }],
  eventsMap: {
    year: {
      2017: {
        month: {
          0: {
            day: {
              1: {
                events: [
                  { id: 123, start: '00:00', end: '01:00', name: 'dentist' }
                ]
              }
            }
          }
        }
      }
    }
  }
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, events: events.push(action.payload) };
    case REMOVE_EVENT:
      return { ...state, events: events.delete(action.payload) };
    default:
      return state;
  }
}
