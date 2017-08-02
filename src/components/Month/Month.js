import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as styles from './Month.scss';
import { getCurrentMonthDays, getNextMonthDays, getPreviousMonthDays } from './getDays';

class Month extends Component {
  componentDidMount() {
    console.log('Month');
  }

  setPreviousMonth = () => {
    const { year, months, setMonth, setYear, history } = this.props;
    let { month } = this.props;
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      month = 11;
    } else {
      setMonth(month - 1);
      month -= 1;
    }
    const monthForHistory = months[month];
    history.push(monthForHistory);
  }
  setNextMonth = () => {
    const { year, setMonth, setYear, history, months } = this.props;
    let { month } = this.props;
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      month = 0;
    } else {
      setMonth(month + 1);
      month += 1;
    }
    const monthForHistory = months[month];
    history.push(monthForHistory);
  }

  getCurrentDate = () => {
    const { year, month } = this.props;
    return moment([year, month, 1]);
  }

  renderPreviousMonthDays = () => {
    const { year, month, months } = this.props;
    const currentDate = this.getCurrentDate() || {};
    const days = getPreviousMonthDays(currentDate) || [];
    return days.map(item =>
      <Link to={{ pathname: `/${months[month]}/${item}` }} className={styles.disabled} key={year + (month - 1) + item}>
        {item}
      </Link>);
  }

  renderCurrentMonthDays = () => {
    const { year, month, months } = this.props;
    const currentDate = this.getCurrentDate() || {};
    const days = getCurrentMonthDays(currentDate) || [];
    return days.map(item =>
      <Link to={{ pathname: `/${months[month]}/${item}` }} className={styles.normal} key={year + month + item}>
        {item}
      </Link>);
  }

  renderNextMonthDays = () => {
    const { year, month, months } = this.props;
    const currentDate = this.getCurrentDate() || {};
    const days = getNextMonthDays(currentDate) || [];
    return days.map(item =>
      <Link to={{ pathname: `/${months[month]}/${item}` }} className={styles.disabled} key={year + (month + 1) + item}>
        {item}
      </Link>);
  }

  renderWeekDay = () => {
    const { year, month, weekDayNames } = this.props;
    return weekDayNames.map(item => <div className={styles.weekDayItem} key={year + month + item}> {item} </div>);
  }


  render() {
    const { month, months, day } = this.props;
    const event = 'event';
    return (
      <div className={styles.month}>
        <div className={styles.title}>
          <Link to={{ pathname: '/' }}>
            <button className={styles.returnButton}> Back </button>
          </Link>
          {months[month]}
          <Link to={{ pathname: `/${months[month]}/${day}/${event}` }}>
            <button onClick={this.addNewEvent} className={styles.addButton}> + </button>
          </Link>
        </div>
        <div className={styles.monthBody}>
          <div className={styles.day}>
            {this.renderWeekDay()}
            {this.renderPreviousMonthDays()}
            {this.renderCurrentMonthDays()}
            {this.renderNextMonthDays()}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={this.setPreviousMonth}> prev </button>
          <button onClick={this.setNextMonth}> next </button>
        </div>
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.number.isRequired || PropTypes.string.isRequired,
  months: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  weekDayNames: PropTypes.array.isRequired,
  setMonth: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
  history: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const newMonth = state.months.months.find(month => month === ownProps.match.params.month);
  console.log('newMonth', newMonth);
  const number = state.months.months.indexOf(newMonth);
  return {
    month: number
  };
};

export default connect(mapStateToProps)(Month);
