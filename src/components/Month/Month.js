import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as styles from './Month.scss';
import * as yearActions from '../../actions/YearActions';
import * as monthActions from '../../actions/MonthActions';
import * as eventActions from '../../actions/EventActions';
import {
  renderPreviousMonthDaysFullView,
  renderCurrentMonthDaysFullView,
  renderNextMonthDaysFullView,
  renderWeekDay,
  setNextMonth,
  setPreviousMonth
} from './getOptions';
import { months } from '../../constants';

export class Month extends Component {
  componentDidMount() {
    const { getEvents } = this.props.eventActions;
    const { events } = this.props;
    getEvents(events);
  }

  render() {
    const { year, month, day, events, history, eventsPending, eventsReceived, eventsError } = this.props;
    const { setMonth } = this.props.monthActions;
    const { setYear } = this.props.yearActions;
    const event = 'event';
    if (eventsPending) {
      return (<div>Loading ...</div>);
    }
    if (eventsError) {
      console.error(eventsError.stack);
      return (<div>{eventsError.message}</div>);
    }
    if (eventsReceived) {
      return (
        <div className={styles.month}>
          <div className={styles.title}>
            <Link to={{ pathname: `/${year}` }}>
              <button className={styles.returnButton}> Back to year</button>
            </Link>
            <span>{months[month]}, {year}</span>
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
            <button id="monthPrev" onClick={() => setPreviousMonth(year, setMonth, setYear, month, history)}> prev </button>
            <button id="monthNext" onClick={() => setNextMonth(year, setMonth, setYear, month, history)}> next </button>
          </div>
        </div>
      );
    }
    return null;
  }
}

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  eventActions: PropTypes.object.isRequired,
  eventsPending: PropTypes.bool,
  eventsReceived: PropTypes.bool,
  eventsError: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const newMonth = months.find(month => month === ownProps.match.params.month);
  const number = months.indexOf(newMonth);
  const newYear = Number(ownProps.match.params.year);
  return {
    year: newYear,
    month: number,
    day: state.day.day,
    events: state.getEvents.events,
    eventsPending: state.getEvents.pending,
    eventsReceived: state.getEvents.received,
    eventsError: state.getEvents.error
  };
};

function mapDispatchToProps(dispatch) {
  return {
    yearActions: bindActionCreators(yearActions, dispatch),
    monthActions: bindActionCreators(monthActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Month);
