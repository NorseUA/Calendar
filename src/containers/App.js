// Modules
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Year from '../components/Year/Year';
import Month from '../components/Month/Month';
import * as monthActions from '../actions/MonthActions';
import * as yearActions from '../actions/YearActions';

// Styles
import * as styles from './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('Welcome');
    console.log(this.props);
  }

  render() {
    const { year: { year }, month: { month }, months: { months }, weekDayNames } = this.props;
    const { setNextMonth, setPreviousMonth } = this.props.monthActions;
    const { setNextYear, setPreviousYear } = this.props.yearActions;
    return (
      <div className={styles.app}>
        <Year
          year={year}
          months={months}
          setNextYear={setNextYear}
          setPreviousYear={setPreviousYear}
        />
        <br />
        <Month
          year={year}
          month={month}
          months={months}
          weekDayNames={weekDayNames.weekDayNames}
          setNextMonth={setNextMonth}
          setPreviousMonth={setPreviousMonth}
          setNextYear={setNextYear}
          setPreviousYear={setPreviousYear}
        />
      </div>
    );
  }
}

App.propTypes = {
  year: PropTypes.object.isRequired,
  months: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired,
  weekDayNames: PropTypes.object.isRequired,
  monthActions: PropTypes.object.isRequired,
  yearActions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  year: state.year,
  months: state.months,
  month: state.month,
  weekDayNames: state.month
});

function mapDispatchToProps(dispatch) {
  return {
    monthActions: bindActionCreators(monthActions, dispatch),
    yearActions: bindActionCreators(yearActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
