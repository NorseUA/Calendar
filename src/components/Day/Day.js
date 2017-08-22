import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as styles from './Day.scss';
import { getDay, setNextDay, setPreviousDay } from './dayHelpers';
import renderDayBody from './renderDayBody';
import * as monthActions from '../../actions/MonthActions';
import * as yearActions from '../../actions/YearActions';
import * as dayActions from '../../actions/DayActions';
import * as eventActions from '../../actions/EventActions';
import { months } from '../../constants';

class Day extends Component {
  componentWillMount() {
    const { getEvents } = this.props.eventActions;
    const { events } = this.props;
    getEvents(events);
  }

  render() {
    const { year, month, day, events, history, eventsPending, eventsReceived, eventsError } = this.props;
    const { setMonth } = this.props.monthActions;
    const { setYear } = this.props.yearActions;
    const { setDay } = this.props.dayActions;
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
        <div className={styles.day} >
          <div className={styles.title}>
            <Link to={{ pathname: `/${year}/${months[month]}` }}>
              <button onClick={this.returnToMonth} className={styles.returnButton}> Back to month </button>
            </Link>
            {getDay(year, month, day)}
            <Link to={{ pathname: `/${year}/${months[month]}/${day}/${event}` }}>
              <button className={styles.addButton}> + </button>
            </Link>
          </div>
          <div className={styles.body}>
            <div className={styles.eventsWrapper}>
              <div className={styles.eventsTitle}>Your events: </div>
              {renderDayBody(year, month, day, events)}
              <div className={styles.eventDescription} />
            </div>
          </div>
          <div className={styles.footer}>
            <button
              onClick={() => setPreviousDay(year, month, day, history, setDay, setMonth, setYear)}
            >
              prev
          </button>
            <button
              onClick={() => setNextDay(year, month, day, history, setDay, setMonth, setYear)}
            >
              next
          </button>
          </div>
        </div >
      );
    }
    return null;
  }
}


Day.propTypes = {
  month: PropTypes.number.isRequired || PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired,
  dayActions: PropTypes.object.isRequired,
  eventActions: PropTypes.object.isRequired,
  history: PropTypes.object,
  events: PropTypes.array.isRequired,
  eventsPending: PropTypes.bool,
  eventsReceived: PropTypes.bool,
  eventsError: PropTypes.object
};


const mapStateToProps = (state, ownProps) => {
  const newDay = Number(ownProps.match.params.day);
  const newMonth = months.find(month => month === ownProps.match.params.month);
  const number = months.indexOf(newMonth);
  const newYear = Number(ownProps.match.params.year);
  return {
    year: newYear,
    day: newDay,
    month: number,
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
    dayActions: bindActionCreators(dayActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);
