// Modules
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Year from '../components/Year/Year';
import Month from '../components/Month/Month';

// Styles
import * as styles from './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  render() {
    const { year: { year }, month: { month }, months: { months }, weekDayNames } = this.props;
    return (
      <div className={styles.app}>
        <Year year={year} months={months} />
        <br />
        <Month year={year} month={month} months={months} weekDayNames={weekDayNames.weekDayNames} />
      </div>
    );
  }
}

App.propTypes = {
  year: PropTypes.object.isRequired,
  months: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired,
  weekDayNames: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  year: state.year,
  months: state.months,
  month: state.month,
  weekDayNames: state.month
});

export default connect(mapStateToProps, {
})(App);
