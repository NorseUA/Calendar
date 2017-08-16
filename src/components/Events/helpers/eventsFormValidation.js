import moment from 'moment';
import { months } from '../../../constants';

const eventsFormValidation = (values) => {
  const errors = {};
  const {
    startDay: chosenStartDay,
    startMonth: chosenStartMonth,
    startYear: chosenStartYear,
    startMinutes: chosenStartMinutes,
    startHours: chosenStartHours,
    name: chosenEventName } = values;
  const year = +chosenStartYear;
  const month = months.indexOf(chosenStartMonth);
  const days = moment([year, month]).daysInMonth();
  const dayValidation = (myDay) => {
    const day = +myDay;
    if (day) {
      if (day > days) {
        return `there are only ${days} days in ${chosenStartMonth}`;
      }
    } else {
      return 'set day';
    }
    return null;
  };

  const checkDay = dayValidation(chosenStartDay);
  if (checkDay) {
    errors.startDay = checkDay;
  }
  if (!chosenEventName) {
    errors.name = 'Event name is required';
  }
  if (!chosenStartMonth && chosenStartMonth !== 0) {
    errors.startMonth = 'set month';
  }
  if (!chosenStartYear) {
    errors.startYear = 'set year';
  }
  if (!chosenStartHours) {
    errors.startHours = 'set hour';
  }
  if (!chosenStartMinutes) {
    errors.startMinutes = 'set minutes';
  }
  return errors;
};

export default eventsFormValidation;
