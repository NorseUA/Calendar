import React, { PropTypes, Component } from 'react';

import * as styles from './Year.scss';

export default class Year extends Component {
  componentDidMount() {
    console.log('year');
  }
  setPreviousYear = () => {
    const { year, setPreviousYear } = this.props;
    setPreviousYear(year - 1);
  }
  setNextYear = () => {
    const { year, setNextYear } = this.props;
    setNextYear(year + 1);
  }
  getMonths = () => {
    const { months, year } = this.props;
    return months.map(item =>
      <div className={styles.month} key={item + year}>{item}</div>);
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
        <div className={styles.monthWrapper}>{this.getMonths()}</div>
      </div>
    );
  }
}


Year.propTypes = {
  year: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired,
  setNextYear: PropTypes.func.isRequired,
  setPreviousYear: PropTypes.func.isRequired
};
