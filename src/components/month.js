import React, { PropTypes, Component } from 'react';


export default class Month extends Component {
  componentDidMount() {
    console.log('Month');
  }
  render() {
    const { months, month } = this.props;
    return (
      <div className="mounth">
        {months[month]}
        <table>
          <thead>
            <tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>
          </thead>
        </table>
      </div>
    );
  }
}


Month.propTypes = {
  month: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired
};
