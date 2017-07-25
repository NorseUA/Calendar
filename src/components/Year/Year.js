import React, { PropTypes, Component } from 'react';

import * as styles from './Year.scss';

export default class Year extends Component {
  componentDidMount() {
    console.log('year');
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
        <div className={styles.title}><button> prev </button>{year}<button> next </button></div>
        <div className={styles.monthWrapper}>{this.getMonths()}</div>
      </div>
    );
  }
}


Year.propTypes = {
  year: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired
};
