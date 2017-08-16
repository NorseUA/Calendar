import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../Events.scss';


const NameInput = ({
  input,
  type,
  meta: { touched, error }
}) => (
  <div>
    <input {...input} type={type} />
    {touched &&
      ((error &&
        <span className={styles.error}>
          {error}
        </span>))}
  </div>);

export default NameInput;


NameInput.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};
