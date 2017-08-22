import { getYears, getHours, getMinutes, fillDays } from './getOptions';
import { months } from '../../../constants';

const eventsSelectConfig = {
  startDate: [
    {
      field: 'startDay',
      options: fillDays(),
      placeholder: 'Day'
    },
    {
      field: 'startMonth',
      options: months,
      placeholder: 'Month'
    },
    {
      field: 'startYear',
      options: getYears(),
      placeholder: 'Year'
    }
  ],
  startTime: [
    {
      field: 'startHours',
      options: getHours(),
      placeholder: 'Hours'
    },
    {
      field: 'startMinutes',
      options: getMinutes(),
      placeholder: 'Minutes'
    }
  ],
  endDate: [
    {
      field: 'endDay',
      options: fillDays(),
      placeholder: 'Day'

    },
    {
      field: 'endMonth',
      options: months,
      placeholder: 'Month'
    },
    {
      field: 'endYear',
      options: getYears(),
      placeholder: 'Year'
    }
  ],
  endTime: [
    {
      field: 'endHours',
      options: getHours(),
      placeholder: 'Hours'
    },
    {
      field: 'endMinutes',
      options: getMinutes(),
      placeholder: 'Minutes'
    }
  ]
};

export default eventsSelectConfig;
