import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import eventsFormValidation from './helpers/eventsFormValidation';
import { getSelectBlockOptions, renderSelectBlocks } from './helpers/renderSelectBlocks';
import NameInput from './helpers/NameInput';
import SaveModal from '../Modals/SaveModal';
import ConfirmModal from '../Modals/ConfirmModal';
import { getEventValues, createNewEvent } from './helpers/eventsHelpers';
import * as styles from './Events.scss';
import * as eventActions from '../../actions/EventActions';
import { months } from '../../constants';


export class Event extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  getMessageLabel = () => {
    const {
      addPending,
      removePending,
      updatePending,
      addReceived,
      removeReceived,
      updateReceived
    } = this.props;
    switch (true) {
      case (addPending): {
        return 'Adding new event...';
      }
      case (removePending): {
        return 'Removing event...';
      }
      case (updatePending): {
        return 'Updating event...';
      }
      case (addReceived): {
        return 'You\'ve successfully added event';
      }
      case (updateReceived): {
        return 'You\'ve successfully updated event';
      }
      case (removeReceived): {
        return 'You\'ve successfully removed event';
      }
      default: return 'Something wrong, try again :(';
    }
  }

  returnToPreviousPage = () => {
    const { history } = this.props;
    history.goBack();
  }

  formOnSubmit = (values) => {
    const { events, id, eventId } = this.props;
    const { updateEvent, addEvent } = this.props.eventActions;
    const eventValues = getEventValues(events, id);
    if (eventValues) {
      const newEvent = createNewEvent(values, id);
      updateEvent(newEvent);
    } else {
      const newEvent = createNewEvent(values, eventId);
      addEvent(newEvent);
    }
  };

  deleteEvent = () => {
    const { id } = this.props;
    const { removeEvent, setConfirmModalState } = this.props.eventActions;
    setConfirmModalState(false);
    removeEvent(id);
  };

  closeConfirmModal = () => {
    const { setConfirmModalState } = this.props.eventActions;
    const { history } = this.props;
    setConfirmModalState(false);
    history.goBack();
  };

  showMessage = () => {
    const {
      addPending,
      removePending,
      updatePending,
      addReceived,
      removeReceived,
      updateReceived,
      addError,
      removeError,
      updateError
    } = this.props;
    const label = this.getMessageLabel();
    if (addPending || removePending || updatePending) {
      return (<div>{label}</div>);
    }
    return (<SaveModal
      isOpen={addReceived || removeReceived || updateReceived || addError || removeError || updateError}
      popupText={label}
      closeLable={'Ok'}
      handleConfirm={this.returnToPreviousPage}
    />);
  }

  render() {
    const {
      pageName,
      resetName,
      submitName,
      id,
      reset,
      submitting,
      pristine,
      confirmIsOpen,
      addPending,
      removePending,
      updatePending,
      addReceived,
      removeReceived,
      updateReceived,
      addError,
      removeError,
      updateError
    } = this.props;
    const { setConfirmModalState } = this.props.eventActions;
    const selectOptins = getSelectBlockOptions();
    if (addPending ||
      removePending ||
      updatePending ||
      addReceived ||
      removeReceived ||
      updateReceived ||
      addError ||
      removeError ||
      updateError) {
      return this.showMessage();
    }
    return (
      <div className={styles.eventWrapper}>
        <ConfirmModal
          isOpen={confirmIsOpen}
          popupText={'Are you sure?'}
          closeLable={'Yes'}
          cancelLable={'Cancel'}
          handleConfirm={this.deleteEvent}
          handleCancel={this.closeConfirmModal}
        />
        <form
          onSubmit={this.props.handleSubmit(
            this.formOnSubmit)}
        >
          <div>
            <div className={styles.header}>
              <button className={styles.returnButton} onClick={this.returnToPreviousPage}> Back </button>
              <div className={styles.eventMainTitle}>{pageName}</div>
              <button className={styles.buttonPrimary} type="button" onClick={reset} disabled={pristine || submitting} >
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
          <button id="submitButton" className={cx(id >= 0 ? styles.buttonUpdate : styles.buttonSubmit)} type="submit" disabled={pristine || submitting}>{submitName}</button>
          <button id="delete" className={cx(id >= 0 ? styles.buttonDelete : styles.buttonHidden)} type="button" onClick={() => setConfirmModalState(true)}>delete</button>
        </form >
      </div>
    );
  }
}

Event.propTypes = {
  id: PropTypes.number,
  addEvent: PropTypes.func,
  events: PropTypes.array,
  eventId: PropTypes.number,
  pageName: PropTypes.string,
  resetName: PropTypes.string,
  submitName: PropTypes.string,
  eventActions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  confirmIsOpen: PropTypes.bool,
  addReceived: PropTypes.bool,
  addError: PropTypes.bool,
  addPending: PropTypes.bool,
  removeReceived: PropTypes.bool,
  removeError: PropTypes.bool,
  removePending: PropTypes.bool,
  updateReceived: PropTypes.bool,
  updateError: PropTypes.bool,
  updatePending: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  console.log('ownProps', ownProps);
  const newDay = Number(ownProps.match.params.day);
  const newYear = Number(ownProps.match.params.year);
  const newMonth = months.find(month => month === ownProps.match.params.month);
  const number = months.indexOf(newMonth);
  const currentId = Number(ownProps.match.params.eventId);
  const values = getEventValues(state.getEvents.events, Number(ownProps.match.params.eventId), months);
  return {
    year: newYear,
    day: newDay,
    month: number,
    id: currentId,
    events: state.getEvents.events,
    initialValues: values,
    eventId: state.getEvents.eventId,
    confirmIsOpen: state.confirmModal.confirmIsOpen,
    errorIsOpen: state.getEvents.errorIsOpen,
    addPending: state.addEvent.pending,
    addReceived: state.addEvent.received,
    addError: state.addEvent.error,
    removePending: state.removeEvent.pending,
    removeReceived: state.removeEvent.received,
    removeError: state.removeEvent.error,
    updatePending: state.updateEvent.pending,
    updateReceived: state.updateEvent.received,
    updateError: state.updateEvent.error,
    history: ownProps.history
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
