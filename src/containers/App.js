// Modules
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Year from '../components/year';
import Month from '../components/month';

// Styles
import * as styles from './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  render() {
    const { year: { year }, month: { month }, months: { months } } = this.props;
    return (
      <div className={styles.app}>
        <Year year={year} months={months} />
        <br />
        <Month year={year} month={month} months={months} />
      </div>
    );
  }
}

App.propTypes = {
  year: PropTypes.object.isRequired,
  months: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  year: state.year,
  months: state.months,
  month: state.month
});

export default connect(mapStateToProps, {
})(App);

