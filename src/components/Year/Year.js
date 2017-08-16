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
import { months } from '../../constants';

class Year extends Component {
  componentDidMount() {
    console.log('year');
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
    console.log('yearHistory', history);
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
  events: PropTypes.array.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const newYear = Number(ownProps.match.params.year);
  return {
    year: newYear,
    events: state.events.events
  };
};

function mapDispatchToProps(dispatch) {
  return {
    yearActions: bindActionCreators(yearActions, dispatch),
    monthActions: bindActionCreators(monthActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Year);
