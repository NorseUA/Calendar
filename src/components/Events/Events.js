import React, { Component, PropTypes } from 'react';
import { Form, Text, Select } from 'react-form';
import { connect } from 'react-redux';
import moment from 'moment';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
// import EventSelect from './EventSelect';
// import { Link } from 'react-router-dom';


// import * as styles from './Events.scss';

class Event extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  getCurrentMonthDays = (year, month) => {
    const currentDate = moment([year, month]);
    const allDaysInMonth = [];
    const days = currentDate.daysInMonth();
    for (let i = 1; i <= days; i++) {
      allDaysInMonth.push(i);
    }
    return allDaysInMonth;
  };

  getOptions = options => (
    options.map(item => (
      {
        label: item,
        value: item
      }
    )
    )
  )
  getMonths = () => {
    const { months } = this.props;
    return months.map((item, index) => (
      {
        label: item,
        value: index
      }
    ));
  }
  getYears = () => {
    const { year } = this.props;
    const years = [];
    const start = year;
    for (let i = start; i <= 2030; i++) {
      years.push(i);
    }
    return years;
  }

  getHours = () => {
    let hours = moment().startOf('day');
    const dayHours = [];
    let time = moment(hours).format('HH');
    for (let i = 0; i < 24; i++) {
      dayHours.push(time);
      hours = moment(hours).add(1, 'hour');
      time = moment(hours).format('HH');
    }
    return dayHours;
  }

  getMinutes = () => {
    let minutes = moment().startOf('hour');
    const hourMinutes = [];
    let time = moment(minutes).format('mm');
    for (let i = 0; i < 60; i++) {
      hourMinutes.push(time);
      minutes = moment(minutes).add(1, 'minutes');
      time = moment(minutes).format('mm');
    }
    return hourMinutes;
  }

  fillDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  }

  render() {
    const { months, day, month, year } = this.props;
    return (
      <div>
        <Form
          onSubmit={(values, state, props, instance) => {
            console.log('Values', values);
            console.log('State', state);
            console.log('Props', props);
            console.log('Instance', instance);
          }}
          onChange={(values) => {
            console.log('Changed', values);
          }}
          validate={(values) => {
            const setDay = values.day;
            const setMonth = values.month;
            const setYear = values.year;
            const days = moment([setYear, setMonth]).daysInMonth();
            console.log('dayyssss', days);
            return {
              day:
              (setDay > days) ?
                `there are only ${days} days in ${months[setMonth]}` : null
            };
          }
          }
        >
          {({
            submitForm,
            resetForm
          }) =>
            (
              <form onSubmit={submitForm}>
                <div>
                  <h6>Event name</h6>
                  <Text
                    field="name"
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <h6>Start</h6>
                  <Select
                    field="day"
                    options={this.getOptions(this.fillDays())}
                    placeholder="Day"
                    value={day}
                  />
                  <Select
                    field="month"
                    options={this.getMonths()}
                    placeholder="Month"
                    value={month}
                  />
                  <Select
                    field="year"
                    options={this.getOptions(this.getYears())}
                    placeholder="Year"
                    value={year}
                  />
                  <Select
                    field="hours"
                    options={this.getOptions(this.getHours())}
                    placeholder="Hours"
                  />
                  <Select
                    field="minutes"
                    options={this.getOptions(this.getMinutes())}
                    placeholder="Minutes"
                  />
                </div>
                <button>Submit</button>
                <button type="button" onClick={resetForm}>
                  Reset Form
                </button>
              </form>
            )
          }
        </Form>
      </div>
    );
  }
}
Event.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired,
  day: PropTypes.number.isRequired
  // setYear: PropTypes.func.isRequired,
  // setMonth: PropTypes.func.isRequired,
  // history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log('event', ownProps);
  const newDay = Number(ownProps.match.params.day);
  const newMonth = state.months.months.find(month => month === ownProps.match.params.month);
  const number = state.months.months.indexOf(newMonth);
  return {
    year: ownProps.year,
    day: newDay,
    month: number
  };
};
export default connect(mapStateToProps)(Event);
