import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as styles from './Day.scss';


class Day extends Component {
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

  getHours = () => {
    let hours = moment().startOf('day');
    const dayHours = [];
    let time = moment(hours).format('HH:mm');
    for (let i = 0; i < 24; i++) {
      dayHours.push(time);
      hours = moment(hours).add(1, 'hour');
      time = moment(hours).format('HH:mm');
    }
    return dayHours.map(item => <div className={styles.events} key={`h${item}`}>{item}</div>);
  }

  getDay = () => {
    const currentDate = this.getCurrentDate();
    return currentDate.format('MMMM, D dddd');
  }
  setPreviousDay = () => {
    const {
      year,
      month,
      months,
      history,
      setDay,
      setMonth,
      setYear
    } = this.props;
    let { day } = this.props;
    if (day === 1) {
      if (month === 0) {
        const lastDay = (this.getLastDay(year - 1, 11, 1));
        console.log(lastDay);
        setDay(lastDay);
        setMonth(11);
        setYear(year - 1);
        day = lastDay;
        history.replace(`/${months[11]}/${day.toString()}`);
      } else {
        const lastDay = (this.getLastDay(year, month - 1, 1));
        setDay(lastDay);
        setMonth(month - 1);
        day = lastDay;
        history.replace(`/${months[month - 1]}/${day.toString()}`);
      }
    } else {
      setDay(day - 1);
      day -= 1;
      history.push(day.toString());
    }
  }
  setNextDay = () => {
    const { year, month, months, setDay, setMonth, setYear, history } = this.props;
    let { day } = this.props;
    const lastDay = this.getLastDayInCurrentMonth();
    if (day === lastDay) {
      if (month === 11) {
        setDay(1);
        setMonth(0);
        setYear(year + 1);
        day = 1;
        history.replace(`/${months[0]}/${day.toString()}`);
      } else {
        setDay(1);
        setMonth(month + 1);
        day = 1;
        history.replace(`/${months[month + 1]}/${day.toString()}`);
      }
    } else {
      setDay(day + 1);
      day += 1;
      history.push(day.toString());
    }
  }

  render() {
    const { month, months, day } = this.props;
    const event = 'event';
    return (
      <div className={styles.day} >
        <div className={styles.title}>
          <Link to={{ pathname: `/${months[month]}` }}>
            <button onClick={this.returnToMonth} className={styles.returnButton}> Back </button>
          </Link>
          {this.getDay()}
          <Link to={{ pathname: `/${months[month]}/${day}/${event}` }}>
            <button onClick={this.addNewEvent} className={styles.addButton}> + </button>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.eventsWrapper}>
            {this.getHours()}
            <div className={styles.eventDescription} />
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={this.setPreviousDay}> prev </button>
          <button onClick={this.setNextDay}> next </button>
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
  history: PropTypes.object
};


const mapStateToProps = (state, ownProps) => {
  const newDay = Number(ownProps.match.params.day);
  const newMonth = state.months.months.find(month => month === ownProps.match.params.month);
  const number = state.months.months.indexOf(newMonth);
  return {
    day: newDay,
    month: number
  };
};

export default connect(mapStateToProps)(Day);
