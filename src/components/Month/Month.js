import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as styles from './Month.scss';
import * as yearActions from '../../actions/YearActions';
import * as monthActions from '../../actions/MonthActions';
import {
  renderPreviousMonthDaysFullView,
  renderCurrentMonthDaysFullView,
  renderNextMonthDaysFullView,
  renderWeekDay,
  setNextMonth,
  setPreviousMonth
} from './getOptions';
import { months } from '../../constants';

class Month extends Component {
  componentDidMount() {
    console.log('Month');
  }

  render() {
    const { year, month, day, events, history } = this.props;
    const { setMonth } = this.props.monthActions;
    const { setYear } = this.props.yearActions;
    const event = 'event';
    return (
      <div className={styles.month}>
        <div className={styles.title}>
          <Link to={{ pathname: `/${year}` }}>
            <button className={styles.returnButton}> Back to year</button>
          </Link>
          {months[month]}, {year}
          <Link to={{ pathname: `/${year}/${months[month]}/${day}/${event}` }}>
            <button className={styles.addButton}> + </button>
          </Link>
        </div>
        <div className={styles.monthBody}>
          <div className={styles.weekDaysWrapper}>
            {renderWeekDay()}
          </div>
          <div className={styles.day}>
            {renderPreviousMonthDaysFullView(year, month, events)}
            {renderCurrentMonthDaysFullView(year, month, events)}
            {renderNextMonthDaysFullView(year, month, events)}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={() => setPreviousMonth(year, setMonth, setYear, month, history)}> prev </button>
          <button onClick={() => setNextMonth(year, setMonth, setYear, month, history)}> next </button>
        </div>
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.number.isRequired || PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const newMonth = months.find(month => month === ownProps.match.params.month);
  const number = months.indexOf(newMonth);
  return {
    year: state.year.year,
    month: number,
    day: state.day.day,
    events: state.events.events
  };
};

function mapDispatchToProps(dispatch) {
  return {
    yearActions: bindActionCreators(yearActions, dispatch),
    monthActions: bindActionCreators(monthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Month);
