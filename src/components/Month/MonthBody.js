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
    const { month, year, events } = this.props;
    return (
      <div className={styles.monthBodyFullView}>
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
  }
}

MonthBody.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};
