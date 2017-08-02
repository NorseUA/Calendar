import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import year from './year';
import months from './months';
import month from './month';
import day from './day';
import events from './events';

export default combineReducers({
  routing: routerReducer,
  year,
  months,
  month,
  day,
  events
});
