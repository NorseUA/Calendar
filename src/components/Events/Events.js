import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import eventsFormValidation from './helpers/eventsFormValidation';
import { getSelectBlockOptions, renderSelectBlocks } from './helpers/renderSelectBlocks';
import NameInput from './helpers/NameInput';
import {
  getEventValues,
  returnToPreviousPage,
  formOnSubmit
} from './helpers/eventsHelpers';
import * as styles from './Events.scss';
import * as eventActions from '../../actions/EventActions';
import { months } from '../../constants';


class Event extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  render() {
    const { pageName, resetName, submitName, events, id, eventId } = this.props;
    const { addEvent, updateEvent, changeId } = this.props.eventActions;
    const selectOptins = getSelectBlockOptions();
    return (
      <div className={styles.eventWrapper}>
        <form
          onSubmit={this.props.handleSubmit(values =>
            formOnSubmit(values, events, id, updateEvent, addEvent, eventId, changeId))}
        >
          <div>
            <div className={styles.header}>
              <button className={styles.returnButton} onClick={returnToPreviousPage}> Back </button>
              <div className={styles.eventMainTitle}>{pageName}</div>
              <button className={styles.buttonPrimary} type="button" onClick={this.props.reset} >
                {resetName}
              </button>
            </div>
            <label htmlFor="eventName" className={styles.eventTitle}>Event name</label>
            <div className={styles.eventNameInput}>
              <Field
                name="name"
                type="text"
                component={NameInput}
              />
            </div>
            {renderSelectBlocks(selectOptins)}
            <label htmlFor="description" className={styles.eventTitle}>Description</label>
            <div className={styles.eventDescription}>
              <Field name="description" component="textarea" placeholder="Event description" id="description" />
            </div>
          </div>
          <button className={styles.buttonSubmit} type="submit">{submitName}</button>
        </form >
      </div>
    );
  }
}

Event.propTypes = {
  id: PropTypes.number.isRequired,
  addEvent: PropTypes.func,
  events: PropTypes.array,
  changeId: PropTypes.func,
  eventId: PropTypes.number,
  pageName: PropTypes.string,
  resetName: PropTypes.string,
  submitName: PropTypes.string,
  eventActions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const newDay = Number(ownProps.match.params.day);
  const newMonth = months.find(month => month === ownProps.match.params.month);
  const number = months.indexOf(newMonth);
  const currentId = Number(ownProps.match.params.eventId);
  return {
    year: state.year.year,
    day: newDay,
    month: number,
    id: currentId,
    events: state.events.events,
    initialValues: getEventValues(state.events.events, Number(ownProps.match.params.eventId), months),
    eventId: state.events.eventId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'event',
  validate: eventsFormValidation
})(Event));
