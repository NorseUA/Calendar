import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './Month.scss';
import {
  renderPreviousMonthDays,
  renderCurrentMonthDays,
  renderNextMonthDays,
  renderWeekDay
} from './getOptions';

export default class MonthBody extends Component {
  componentDidMount() {
    console.log('Month');
  }

  render() {
    const { month, months, year, weekDayNames, events } = this.props;
    return (
      <div className={styles.monthBodyFullView}>
        <div className={styles.weekDaysWrapper}>
          {renderWeekDay(year, month, weekDayNames, events)}
        </div>
        <div className={styles.day}>
          {renderPreviousMonthDays(year, month, months, events)}
          {renderCurrentMonthDays(year, month, months, events)}
          {renderNextMonthDays(year, month, months, events)}
        </div>
      </div>
    );
  }
}

MonthBody.propTypes = {
  month: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  weekDayNames: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired
};
