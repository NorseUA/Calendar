import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import year from './year';
import month from './month';
import day from './day';
import getEvents from './events/getEvents';
import addEvent from './events/addEvent';
import removeEvent from './events/removeEvent';
import updateEvent from './events/updateEvent';
import confirmModal from './events/confirmModal';


export default combineReducers({
  routing: routerReducer,
  year,
  month,
  day,
  getEvents,
  addEvent,
  removeEvent,
  updateEvent,
  confirmModal,
  form: formReducer
});
