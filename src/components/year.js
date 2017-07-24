import React, { PropTypes, Component } from 'react';


export default class Year extends Component {
  componentDidMount() {
    console.log('year');
  }
  render() {
    const { months, year } = this.props;
    const month = months.map(item => (
      <div className="mounth" key={item + year}>{item}</div>
    )
    );
    return (
      <div className="year">
        {year}
        {month}
      </div>
    );
  }
}


Year.propTypes = {
  year: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired
};
