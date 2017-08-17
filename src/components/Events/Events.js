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
import {
  getEventValues,
  returnToPreviousPage,
  formOnSubmit,
  deleteEvent,
  confirmSavingEvent,
  confirmUpdatingEvent
} from './helpers/eventsHelpers';
import * as styles from './Events.scss';
import * as eventActions from '../../actions/EventActions';
import * as modalsActions from '../../actions/ModalsActions';
import { months } from '../../constants';


class Event extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  render() {
    const {
      pageName,
      resetName,
      submitName,
      events,
      id,
      eventId,
      reset,
      submitting,
      pristine,
      confirmIsOpen,
      saveIsOpen,
      updateIsOpen
    } = this.props;
    const { addEvent, updateEvent, removeEvent, changeId } = this.props.eventActions;
    const { setConfirmModalState, setSaveModalState, setUpdateModalState } = this.props.modalsActions;
    const selectOptins = getSelectBlockOptions();
    return (
      <div className={styles.eventWrapper}>
        <ConfirmModal
          isOpen={confirmIsOpen}
          popupText={'Are you sure?'}
          closeLable={'Yes'}
          cancelLable={'Cancel'}
          handleConfirm={() => deleteEvent(id, removeEvent, setConfirmModalState)}
          handleCancel={() => setConfirmModalState(false)}
        />
        <SaveModal
          isOpen={saveIsOpen}
          popupText={'You\'ve succesfully added event'}
          closeLable={'Ok'}
          handleConfirm={() => confirmSavingEvent(setSaveModalState)}
        />
        <SaveModal
          isOpen={updateIsOpen}
          popupText={'You\'ve succesfully updated event'}
          closeLable={'Ok'}
          handleConfirm={() => confirmUpdatingEvent(setUpdateModalState)}
        />
        <form
          onSubmit={this.props.handleSubmit(values =>
            formOnSubmit(values,
              events,
              id,
              updateEvent,
              addEvent,
              eventId,
              changeId,
              setSaveModalState,
              setUpdateModalState))}
        >
          <div>
            <div className={styles.header}>
              <button className={styles.returnButton} onClick={returnToPreviousPage}> Back </button>
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
          <button className={cx(id >= 0 ? styles.buttonUpdate : styles.buttonSubmit)} type="submit" disabled={pristine || submitting}>{submitName}</button>
          <button className={cx(id >= 0 ? styles.buttonDelete : styles.buttonHidden)} type="button" onClick={() => setConfirmModalState(true)}>delete</button>
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
  modalsActions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  confirmIsOpen: PropTypes.bool,
  saveIsOpen: PropTypes.bool,
  updateIsOpen: PropTypes.bool
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
    eventId: state.events.eventId,
    confirmIsOpen: state.confirm.open,
    saveIsOpen: state.save.open,
    updateIsOpen: state.update.open
  };
};

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch),
    modalsActions: bindActionCreators(modalsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'event',
  validate: eventsFormValidation
})(Event));
