import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Month.scss';
import {
  renderPreviousMonthDays,
  renderCurrentMonthDays,
  renderNextMonthDays,
  renderWeekDay
} from './getOptions';

const MonthBody = ({ month, year, events }) => {
  const previousMonthDays = renderPreviousMonthDays(year, month, events);
  const constNextMonthDays = renderCurrentMonthDays(year, month, events);
  const nextMonthDays = renderNextMonthDays(year, month, events);
  return (<div className={styles.monthBodyFullView}>
    <div className={styles.weekDaysWrapper}>
      {renderWeekDay(year, month, events)}
    </div>
    <div className={styles.day}>
      {previousMonthDays}
      {constNextMonthDays}
      {nextMonthDays}
    </div>
  </div>
  );
};


MonthBody.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};

export default MonthBody;
