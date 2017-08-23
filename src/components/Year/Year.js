import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 } from 'node-uuid';
import * as styles from './Year.scss';
import MonthBody from '../Month/MonthBody';
import * as yearActions from '../../actions/YearActions';
import * as monthActions from '../../actions/MonthActions';
import * as eventActions from '../../actions/EventActions';
import { months } from '../../constants';

class Year extends Component {
  componentDidMount() {
    const { getEvents } = this.props.eventActions;
    const { events } = this.props;
    getEvents(events);
  }

  setPreviousYear = () => {
    const { year, history } = this.props;
    const { setYear } = this.props.yearActions;
    setYear(year - 1);
    const yearForHistory = (year - 1).toString();
    history.push(yearForHistory);
  }

  setNextYear = () => {
    const { year, history } = this.props;
    const { setYear } = this.props.yearActions;
    setYear(year + 1);
    const yearForHistory = (year + 1).toString();
    history.push(yearForHistory);
  }

  setMonth = (item, index) => {
    const { setMonth } = this.props.monthActions;
    setMonth(index);
  }
  getMonths = () => months.map((item, index) => {
    const { year, events } = this.props;
    return (
      <div className={styles.monthWrapper} key={v4()}>
        <Link
          to={{ pathname: `/${year}/${item}` }}
          className={styles.title}
          key={v4()}
          onClick={() => this.setMonth(item, index)}
        >
          {item}
        </Link>
        <MonthBody year={year} month={index} events={events} />
      </div>);
  });

  render() {
    const { eventsPending, eventsReceived, eventsError, year } = this.props;
    if (eventsPending) {
      return (<div>Loading ...</div>);
    }
    if (eventsError) {
      console.error(eventsError.stack);
      return (<div>{eventsError.message}</div>);
    }
    if (eventsReceived) {
      return (
        <div className={styles.year}>
          <div className={styles.title}>
            <button onClick={this.setPreviousYear}> prev </button>
            {year}
            <button onClick={this.setNextYear}> next </button>
          </div>
          <div className={styles.yearBody}>
            {this.getMonths()}
          </div>
        </div>
      );
    } return null;
  }
}


Year.propTypes = {
  year: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  eventActions: PropTypes.object.isRequired,
  eventsPending: PropTypes.bool,
  eventsReceived: PropTypes.bool,
  eventsError: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const newYear = Number(ownProps.match.params.year);
  return {
    year: newYear,
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
export default connect(mapStateToProps, mapDispatchToProps)(Year);
