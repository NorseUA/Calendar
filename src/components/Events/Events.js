import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Text, Textarea } from 'react-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import eventsFormValidation from './eventsFormValidation';
import { getSelectBlockOptions, renderSelectBlocks } from './renderSelectBlocks';

import * as styles from './Events.scss';

class Event extends Component {
  componentDidMount() {
    console.log('Welcome');
  }

  addEvent = (event) => {
    const { eventId, addEvent, events } = this.props;
    const { startYear, startMonth, startDay, startHours, startMinutes } = event;
    const date = moment([startYear, startMonth, startDay, startHours, startMinutes]);
    events.push({ date, id: eventId, event });
    addEvent(events);
  }

  changeId = (eventId) => {
    const { changeId } = this.props;
    eventId += 1;
    changeId(eventId);
  }

  render() {
    const { months, month, eventId } = this.props;
    const selectOptins = getSelectBlockOptions();
    return (
      <div className={styles.eventWrapper}>
        <Form
          onSubmit={(values) => {
            const event = values;
            event.id = eventId;
            this.addEvent(event);
            this.changeId(eventId);
            history.back();
          }}
          validate={values => eventsFormValidation(values, months)}
        >
          {({
            submitForm,
            resetForm
          }) =>
            (
              <form onSubmit={submitForm}>
                <div>
                  <div className={styles.header}>
                    <Link to={{ pathname: `/${months[month]}` }}>
                      <button className={styles.returnButton}> Back </button>
                    </Link>
                    <div className={styles.eventMainTitle}>Add new event</div>
                    <button className={styles.buttonPrimary} type="button" onClick={resetForm}>
                      Clear
                </button>
                  </div>
                  <div className={styles.eventTitle}>Event name</div>
                  <div className={styles.eventNameInput}>
                    <Text
                      field="name"
                      placeholder="Enter event name"
                    />
                  </div>
                  {renderSelectBlocks(selectOptins)}
                  <div className={styles.eventDescription}>
                    <Textarea
                      field="description"
                      placeholder="Event description"
                    />
                  </div>
                </div>
                <button className={styles.buttonSubmit}>Save</button>
              </form>
            )
          }
        </Form>
      </div>
    );
  }
}


Event.propTypes = {
  month: PropTypes.number.isRequired,
  months: PropTypes.array.isRequired,
  addEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  changeId: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const newDay = Number(ownProps.match.params.day);
  const newMonth = state.months.months.find(month => month === ownProps.match.params.month);
  const number = state.months.months.indexOf(newMonth);
  return {
    year: ownProps.year,
    day: newDay,
    month: number,
    events: ownProps.events,
    eventId: ownProps.eventId
  };
};
export default connect(mapStateToProps)(Event);
