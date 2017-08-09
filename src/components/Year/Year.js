import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as styles from './Year.scss';
import MonthBody from '../Month/MonthBody';

class Year extends Component {
  componentDidMount() {
    console.log('year');
  }
  setPreviousYear = () => {
    const { year, setYear } = this.props;
    setYear(year - 1);
  }
  setNextYear = () => {
    const { year, setYear } = this.props;
    setYear(year + 1);
  }
  setMonth = (item, index) => {
    const { setMonth, history } = this.props;
    setMonth(index);
    history.push(item);
  }
  getMonths = () => {
    const { months } = this.props;
    return months.map((item, index) => {
      const { year, weekDayNames, events } = this.props;
      return (
        <div className={styles.monthWrapper} key={`${item}+ym`}>
          <Link
            to={{ pathname: `/${item}` }}
            className={styles.title}
            key={item + year}
            onClick={() => this.setMonth(item, index)}
          >
            {item}
          </Link>
          <MonthBody year={year} month={index} months={months} weekDayNames={weekDayNames} events={events} />
        </div>);
    });
  }
  render() {
    const { year } = this.props;
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
  }
}


Year.propTypes = {
  year: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired,
  setYear: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  weekDayNames: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    year: ownProps.year,
    events: ownProps.events
  };
};
export default connect(mapStateToProps)(Year);
