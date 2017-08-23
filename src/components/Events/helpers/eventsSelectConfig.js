import { getYears, getHours, getMinutes, fillDays } from './getOptions';
import { months } from '../../../constants';

const eventsSelectConfig = {
  startDate: [
    {
      field: 'startDay',
      options: fillDays(),
      placeholder: 'day'
    },
    {
      field: 'startMonth',
      options: months,
      placeholder: 'month'
    },
    {
      field: 'startYear',
      options: getYears(),
      placeholder: 'year'
    }
  ],
  startTime: [
    {
      field: 'startHours',
      options: getHours(),
      placeholder: 'hours'
    },
    {
      field: 'startMinutes',
      options: getMinutes(),
      placeholder: 'minutes'
    }
  ],
  endDate: [
    {
      field: 'endDay',
      options: fillDays(),
      placeholder: 'day'

    },
    {
      field: 'endMonth',
      options: months,
      placeholder: 'month'
    },
    {
      field: 'endYear',
      options: getYears(),
      placeholder: 'year'
    }
  ],
  endTime: [
    {
      field: 'endHours',
      options: getHours(),
      placeholder: 'hours'
    },
    {
      field: 'endMinutes',
      options: getMinutes(),
      placeholder: 'minutes'
    }
  ]
};

export default eventsSelectConfig;
