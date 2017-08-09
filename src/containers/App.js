// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Year from '../components/Year/Year';
import Month from '../components/Month/Month';
import Day from '../components/Day/Day';
import Event from '../components/Events/Events';
import * as monthActions from '../actions/MonthActions';
import * as yearActions from '../actions/YearActions';
import * as dayActions from '../actions/DayActions';
import * as eventActions from '../actions/EventActions';
// Styles
import * as styles from './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  render() {
    const {
      year: { year },
      month: { month },
      months: { months },
      day: { day },
      weekDayNames,
      history } = this.props;
    const { events, eventId } = this.props.events;
    const { setMonth } = this.props.monthActions;
    const { setYear } = this.props.yearActions;
    const { setDay } = this.props.dayActions;
    const { addEvent, removeEvent, changeId } = this.props.eventActions;
    return (
      <div className={styles.app}>
        <Switch>
          <Route
            exact path="/"
            component={() => (
              <Year
                year={year}
                months={months}
                setYear={setYear}
                weekDayNames={weekDayNames.weekDayNames}
                setMonth={setMonth}
                history={history}
                day={day}
                events={events}
              />)}
          />
          <Route
            exact path="/:month"
            render={newMonth => (
              <Month
                year={year}
                {...newMonth}
                month={month}
                months={months}
                day={day}
                weekDayNames={weekDayNames.weekDayNames}
                setMonth={setMonth}
                setYear={setYear}
                events={events}
              />)}
          />
          <Route
            exact path="/:month/:day"
            render={(newDay, newMonth) => (
              <Day
                year={year}
                month={month}
                months={months}
                {...newDay}
                {...newMonth}
                day={day}
                setMonth={setMonth}
                setYear={setYear}
                setDay={setDay}
                events={events}
              />)}
          />
          <Route
            exact path="/:month/:day/:event"
            render={(newDay, newMonth) => (
              <Event
                year={year}
                month={month}
                months={months}
                events={events}
                {...newDay}
                {...newMonth}
                day={day}
                setMonth={setMonth}
                setYear={setYear}
                setDay={setDay}
                addEvent={addEvent}
                removeEvent={removeEvent}
                changeId={changeId}
                eventId={eventId}
              />)}
          />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  year: PropTypes.object.isRequired,
  months: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  weekDayNames: PropTypes.object.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired,
  dayActions: PropTypes.object.isRequired,
  eventActions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  events: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  console.log('AppState', state);
  return {
    year: state.year,
    months: state.months,
    month: state.month,
    weekDayNames: state.month,
    day: state.day,
    events: state.events,
    ownProps
  };
};

function mapDispatchToProps(dispatch) {
  return {
    monthActions: bindActionCreators(monthActions, dispatch),
    yearActions: bindActionCreators(yearActions, dispatch),
    dayActions: bindActionCreators(dayActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
