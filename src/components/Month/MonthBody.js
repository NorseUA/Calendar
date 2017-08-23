import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Month.scss';
import {
  renderPreviousMonthDays,
  renderCurrentMonthDays,
  renderNextMonthDays,
  renderWeekDay
} from './getOptions';


const MonthBody = ({ month, year, events }) =>
  (<div className={styles.monthBodyFullView}>
    <div className={styles.weekDaysWrapper}>
      {renderWeekDay(year, month, events)}
    </div>
    <div className={styles.day}>
      {renderPreviousMonthDays(year, month, events)}
      {renderCurrentMonthDays(year, month, events)}
      {renderNextMonthDays(year, month, events)}
    </div>
  </div>
  );


MonthBody.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};

export default MonthBody;
