import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as styles from './Year.scss';

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
    const { months, year } = this.props;
    return months.map((item, index) => (
      <Link
        to={{ pathname: `/${item}` }}
        className={styles.month}
        key={item + year}
        onClick={() => this.setMonth(item, index)}
      >
        {item}
      </Link>
    ));
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
  setYear: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log('year', ownProps);
  return {
    year: ownProps.year
  };
};
export default connect(mapStateToProps)(Year);
