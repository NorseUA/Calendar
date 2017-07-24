import { combineReducers } from 'redux';
import year from './year';
import months from './months';
import month from './month';

export default combineReducers({
  year,
  months,
  month
});
