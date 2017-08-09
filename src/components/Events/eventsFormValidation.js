import moment from 'moment';

const eventsFormValidation = (values, months) => {
  const errors = {};
  const {
    startDay: chosenStartDay,
    startMonth: chosenStartMonth,
    startYear: chosenStartYear,
    startMinutes: chosenStartMinutes,
    startHours: chosenStartHours,
    name: chosenEventName } = values;
  const days = moment([chosenStartYear, chosenStartMonth]).daysInMonth();
  const dayValidation = (myDay) => {
    if (myDay) {
      if (myDay > days) {
        return `there are only ${days} days in ${months[chosenStartMonth]}`;
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
