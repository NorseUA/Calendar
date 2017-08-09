import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as styles from './Month.scss';
import {
  renderPreviousMonthDaysFullView,
  renderCurrentMonthDaysFullView,
  renderNextMonthDaysFullView,
  renderWeekDay,
  setNextMonth,
  setPreviousMonth
} from './getOptions';

class Month extends Component {
  componentDidMount() {
    console.log('Month');
  }

  render() {
    const { year, month, months, day, weekDayNames, events, setMonth, setYear, history } = this.props;
    const event = 'event';
    return (
      <div className={styles.month}>
        <div className={styles.title}>
          <Link to={{ pathname: '/' }}>
            <button className={styles.returnButton}> Back </button>
          </Link>
          {months[month]}, {year}
          <Link to={{ pathname: `/${months[month]}/${day}/${event}` }}>
            <button onClick={this.addNewEvent} className={styles.addButton}> + </button>
          </Link>
        </div>
        <div className={styles.monthBody}>
          <div className={styles.weekDaysWrapper}>
            {renderWeekDay(year, month, weekDayNames, events)}
          </div>
          <div className={styles.day}>
            {renderPreviousMonthDaysFullView(year, month, months, events)}
            {renderCurrentMonthDaysFullView(year, month, months, events)}
            {renderNextMonthDaysFullView(year, month, months, events)}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={() => setPreviousMonth(year, setMonth, setYear, history, months, month)}> prev </button>
          <button onClick={() => setNextMonth(year, setMonth, setYear, history, months, month)}> next </button>
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
  history: PropTypes.object,
  events: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const newMonth = state.months.months.find(month => month === ownProps.match.params.month);
  const number = state.months.months.indexOf(newMonth);
  return {
    month: number
  };
};

export default connect(mapStateToProps)(Month);
