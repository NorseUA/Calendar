import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import year from './year';
import month from './month';
import day from './day';
import events from './events';
import confirm from './confirm';
import save from './save';
import update from './update';

export default combineReducers({
  routing: routerReducer,
  year,
  month,
  day,
  events,
  confirm,
  save,
  update,
  form: formReducer
});
