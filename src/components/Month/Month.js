import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import * as styles from './Month.scss';
import { getCurrentMonthDays, getNextMonthDays, getPreviousMonthDays } from './getDays';

export default class Month extends Component {
  componentDidMount() {
    console.log('Month');
  }

  getCurrentDate = () => {
    const { year, month } = this.props;
    return moment().year(year).month(month).date(1);
  }

  renderPreviousMonthDays = () => {
    const { year, month } = this.props;
    const currentDate = this.getCurrentDate() || {};
    const days = getPreviousMonthDays(currentDate) || [];
    return days.map(item =>
      <div className={styles.disabled} key={year + (month - 1) + item}> {item} </div>);
  }

  renderCurrentMonthDays = () => {
    const { year, month } = this.props;
    const currentDate = this.getCurrentDate() || {};
    const days = getCurrentMonthDays(currentDate) || [];
    return days.map(item =>
      <div className={styles.normal} key={year + month + item}> {item} </div>);
  }

  renderNextMonthDays = () => {
    const { year, month } = this.props;
    const currentDate = this.getCurrentDate() || {};
    const days = getNextMonthDays(currentDate) || [];
    return days.map(item =>
      <div className={styles.disabled} key={year + (month + 1) + item}> {item} </div>);
  }

  renderWeekDay = () => {
    const { year, month, weekDayNames } = this.props;
    return weekDayNames.map(item => <div key={year + month + item}> {item} </div>);
  }

  render() {
    const { month, months } = this.props;
    return (
      <div className={styles.month}>
        <div className={styles.title}><button> prev </button>{months[month]}<button> next </button></div>
        <div className={styles.weekday}> {this.renderWeekDay()} </div>
        <div className={styles.day}>
          {this.renderPreviousMonthDays()}
          {this.renderCurrentMonthDays()}
          {this.renderNextMonthDays()}
        </div>
      </div>
    );
  }
}


Month.propTypes = {
  month: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  weekDayNames: PropTypes.array.isRequired
};
