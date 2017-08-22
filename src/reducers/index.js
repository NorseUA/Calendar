import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import year from './year';
import month from './month';
import day from './day';
import getEvents from './getEvents';

export default combineReducers({
  routing: routerReducer,
  year,
  month,
  day,
  getEvents,
  form: formReducer
});
