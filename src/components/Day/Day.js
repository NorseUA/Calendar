import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as styles from './Day.scss';
import { getDay, setNextDay, setPreviousDay } from './dayHelpers';
import renderDayBody from './renderDayBody';


class Day extends Component {
  componentDidMount() {
    console.log('Day');
  }

  render() {
    const { year, month, months, day, events, history, setDay, setMonth, setYear } = this.props;
    const event = 'event';
    return (
      <div className={styles.day} >
        <div className={styles.title}>
          <Link to={{ pathname: `/${months[month]}` }}>
            <button onClick={this.returnToMonth} className={styles.returnButton}> Back </button>
          </Link>
          {getDay(year, month, day)}
          <Link to={{ pathname: `/${months[month]}/${day}/${event}` }}>
            <button onClick={this.addNewEvent} className={styles.addButton}> + </button>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.eventsWrapper}>
            <div className={styles.eventsTitle}>Your events: </div>
            {renderDayBody(year, month, months, day, events)}
            <div className={styles.eventDescription} />
          </div>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => setPreviousDay(year, month, months, day, history, setDay, setMonth, setYear)}
          >
            prev
          </button>
          <button
            onClick={() => setNextDay(year, month, months, day, history, setDay, setMonth, setYear)}
          >
            next
          </button>
        </div>
      </div >
    );
  }
}


Day.propTypes = {
  month: PropTypes.number.isRequired || PropTypes.string.isRequired,
  months: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
  setDay: PropTypes.func.isRequired,
  history: PropTypes.object,
  events: PropTypes.array.isRequired
};


const mapStateToProps = (state, ownProps) => {
  const newDay = Number(ownProps.match.params.day);
  const newMonth = state.months.months.find(month => month === ownProps.match.params.month);
  const number = state.months.months.indexOf(newMonth);
  return {
    day: newDay,
    month: number,
    events: ownProps.events
  };
};

export default connect(mapStateToProps)(Day);
