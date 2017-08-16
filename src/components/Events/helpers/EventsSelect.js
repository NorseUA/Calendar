import React from 'react';
import { v4 } from 'node-uuid';
import PropTypes from 'prop-types';
import * as styles from '../Events.scss';

const EventSelect = ({ input, field, options, meta: { touched, error } }) => {
  console.log(options);
  return (<div>
    <select {...input}>
      <option value="">Select {`${field}`}</option>
      {options.map(selectOption =>
        <option value={selectOption} key={v4()}>
          {selectOption}
        </option>
      )}
    </select>
    {touched &&
      error &&
      <span className={styles.error}>
        {error}
      </span>}
  </div>);
};

export default EventSelect;

EventSelect.propTypes = {
  meta: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
};
