import moment from 'moment';

export const getOptions = options => (
  options.map(item => (
    {
      label: item,
      value: item
    }
  )
  )
);

export const getYears = () => {
  const years = [];
  const start = moment().year();
  for (let i = start; i <= 2030; i++) {
    years.push(i);
  }
  return years;
};

export const getHours = () => {
  let hours = moment().startOf('day');
  const dayHours = [];
  let time = moment(hours).format('HH');
  for (let i = 0; i < 24; i++) {
    dayHours.push(time);
    hours = moment(hours).add(1, 'hour');
    time = moment(hours).format('HH');
  }
  return dayHours;
};

export const getMinutes = () => {
  let minutes = moment().startOf('hour');
  const hourMinutes = [];
  let time = moment(minutes).format('mm');
  for (let i = 0; i < 60; i++) {
    hourMinutes.push(time);
    minutes = moment(minutes).add(1, 'minutes');
    time = moment(minutes).format('mm');
  }
  return hourMinutes;
};

export const fillDays = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
};
