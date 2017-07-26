import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import * as styles from './Day.scss';

export default class Day extends Component {
  componentDidMount() {
    console.log('Day');
  }

  getCurrentDate = () => {
    const { year, month, day } = this.props;
    return moment([year, month, day]);
  }

  getLastDayInCurrentMonth = () => {
    const currentDate = this.getCurrentDate();
    return currentDate.daysInMonth();
  }

  getLastDay = (year, month, day) => {
    const currentDate = moment([year, month, day]);
    return currentDate.daysInMonth();
  }

  setPreviousDay = () => {
    const {
      year,
      month,
      day,
      setPreviousDay,
      setPreviousMonth,
      setPreviousYear
    } = this.props;

    if (day === 1) {
      if (month === 0) {
        const lastDay = (this.getLastDay(year - 1, 11, 1));
        console.log(lastDay);
        setPreviousDay(lastDay);
        setPreviousMonth(11);
        setPreviousYear(year - 1);
      } else {
        const lastDay = (this.getLastDay(year, month - 1, 1));
        console.log(lastDay);
        setPreviousDay(lastDay);
        setPreviousMonth(month - 1);
      }
    } else {
      setPreviousDay(day - 1);
    }
  }
  setNextDay = () => {
    const { year, month, setNextDay, setNextMonth, setNextYear, day } = this.props;
    const lastDay = this.getLastDayInCurrentMonth();
    if (day === lastDay) {
      if (month === 11) {
        setNextDay(1);
        setNextMonth(0);
        setNextYear(year + 1);
      } else {
        setNextDay(1);
        setNextMonth(month + 1);
      }
    } else {
      setNextDay(day + 1);
    }
  }

  render() {
    const { day } = this.props;
    return (
      <div className={styles.day}>
        <div className={styles.title}>
          <button onClick={this.setPreviousDay}> prev </button>
          {day}
          <button onClick={this.setNextDay}> next </button></div>
      </div>
    );
  }
}


Day.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  setNextMonth: PropTypes.func.isRequired,
  setPreviousMonth: PropTypes.func.isRequired,
  setNextYear: PropTypes.func.isRequired,
  setPreviousYear: PropTypes.func.isRequired,
  setNextDay: PropTypes.func.isRequired,
  setPreviousDay: PropTypes.func.isRequired
};
