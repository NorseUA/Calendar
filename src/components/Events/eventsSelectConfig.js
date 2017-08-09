import { getOptions, getMonths, getYears, getHours, getMinutes, fillDays } from './getOptions';

const eventsSelectConfig = {
  startDate: [
    {
      field: 'startDay',
      options: getOptions(fillDays()),
      placeholder: 'Day'
    },
    {
      field: 'startMonth',
      options: getMonths(),
      placeholder: 'Month'
    },
    {
      field: 'startYear',
      options: getOptions(getYears()),
      placeholder: 'Year'
    }
  ],
  startTime: [
    {
      field: 'startHours',
      options: getOptions(getHours()),
      placeholder: 'Hours'
    },
    {
      field: 'startMinutes',
      options: getOptions(getMinutes()),
      placeholder: 'Minutes'
    }
  ],
  endDate: [
    {
      field: 'endDay',
      options: getOptions(fillDays()),
      placeholder: 'Day'

    },
    {
      field: 'endMonth',
      options: getMonths(),
      placeholder: 'Month'
    },
    {
      field: 'endYear',
      options: getOptions(getYears()),
      placeholder: 'Year'
    }
  ],
  endTime: [
    {
      field: 'endHours',
      options: getOptions(getHours()),
      placeholder: 'Hours'
    },
    {
      field: 'endMinutes',
      options: getOptions(getMinutes()),
      placeholder: 'Minutes'
    }

  ]
};

export default eventsSelectConfig;
