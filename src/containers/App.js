// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
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
    console.log('Year');
  }

  render() {
    const { year } = this.props;
    return (<div className={styles.app}>
      <Redirect to={`/${year}`} />
      <Switch>
        <Route
          exact path="/:year"
          render={newYear => (
            <Year
              {...newYear}
            />)}
        />
        <Route
          exact path="/:year/:month"
          render={(newMonth, newYear) => (
            <Month
              {...newMonth}
              {...newYear}
            />)}
        />
        <Route
          exact path="/:year/:month/:day"
          render={(newDay, newMonth) => (
            <Day
              {...newDay}
              {...newMonth}
            />)}
        />
        <Route
          exact path="/:year/:month/:day/:event"
          render={(newDay, newMonth) => (
            <Event
              {...newDay}
              {...newMonth}
              pageName="add event"
              resetName="clear"
              submitName="save"
            />)}
        />
        <Route
          exact path="/:year/:month/:day/:event/:eventId"
          render={(newDay, newMonth, id) => (
            <Event
              {...newDay}
              {...newMonth}
              {...id}
              pageName="update event"
              resetName="cancel"
              submitName="update"
            />)}
        />
      </Switch>
    </div>
    );
  }
}

App.propTypes = {
  year: PropTypes.number
};

const mapStateToProps = state => ({ year: state.year.year });


function mapDispatchToProps(dispatch) {
  return {
    monthActions: bindActionCreators(monthActions, dispatch),
    yearActions: bindActionCreators(yearActions, dispatch),
    dayActions: bindActionCreators(dayActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
