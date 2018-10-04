import React from 'react';
import { shallow } from 'enzyme';
import { Event } from './../Events';
import ConfirmModal from '../../Modals/ConfirmModal';

const events = [
  {
    date: '2017-02-02T05:09:00.000Z',
    event: {
      description: null,
      endDay: null,
      endHours: null,
      endMinutes: null,
      endMonth: null,
      endYear: null,
      name: 'Hi',
      startDay: 2,
      startHours: '08',
      startMinutes: '09',
      startMonth: 1,
      startYear: 2017
    },
    id: 1
  },
  {
    date: '2017-02-02T11:06:00.000Z',
    event: {
      description: null,
      endDay: null,
      endHours: null,
      endMinutes: null,
      endMonth: null,
      endYear: null,
      name: 'Hello',
      startDay: 2,
      startHours: '01',
      startMinutes: '10',
      startMonth: 1,
      startYear: 2017
    },
    id: 2
  }
];

const values = {
  description: 'description',
  endDay: 1,
  endHours: '02',
  endMinutes: '02',
  endMonth: 'February',
  endYear: 2017,
  name: 'Hello',
  startDay: 1,
  startHours: '01',
  startMinutes: '01',
  startMonth: 'February',
  startYear: 2017
};

const handleSubmit = jest.fn();
const wrapper = shallow(<Event
  month={1}
  day={1}
  year={2017}
  addPending={false}
  addReceived={false}
  addError={null}
  removePending={false}
  removeReceived={false}
  removeError={null}
  updatePending={false}
  updateReceived={false}
  updateError={null}
  events={[]}
  history={{}}
  eventActions={{}}
  monthActions={{}}
  yearActions={{}}
  initialValues={{}}
  eventId={1}
  handleSubmit={handleSubmit}
  id={null}
  confirmIsOpen={false}
  pageName={'add event'}
  resetName={'clear'}
  submitName={'save'}
/>);

describe('Events Shallow Render ', () => {
  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('sould contain ADD EVENT case: render empty event', () => {
    wrapper.setProps({
      pageName: 'add event',
      resetName: 'clear',
      submitName: 'save'
    });
    expect(wrapper.contains('add event')).toBe(true);
  });
});

describe('Events Shallow Render,  case: render filled event', () => {
  it('sould contain update event', () => {
    const eventActions = {
      setConfirmModalState: jest.fn()
    };
    wrapper.setProps({
      initialValues: values,
      eventId: 0,
      id: 1,
      confirmIsOpen: false,
      pageName: 'update event',
      resetName: 'cancel',
      submitName: 'update',
      events,
      eventActions
    });
    expect(wrapper.contains('update event')).toBe(true);
    wrapper.find('#delete').simulate('click');
    expect(eventActions.setConfirmModalState).toHaveBeenCalledWith(true);
  });
});

describe('Events Shallow Render,  simulate click on buttons', () => {
  it('simulating close confirm modal', () => {
    const history = {
      push: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn()
    };
    const eventActions = {
      setConfirmModalState: jest.fn(),
      removeEvent: jest.fn()
    };
    wrapper.setProps({
      initialValues: values,
      eventId: 1,
      id: 1,
      confirmIsOpen: true,
      pageName: 'update event',
      resetName: 'cancel',
      submitName: 'update',
      history,
      eventActions
    });
    const modalOk = wrapper.find(ConfirmModal).prop('handleConfirm');
    modalOk();
    expect(eventActions.removeEvent).toHaveBeenCalledWith(1);
    const modalCancel = wrapper.find(ConfirmModal).prop('handleCancel');
    modalCancel();
    expect(history.goBack).toHaveBeenCalled();
  });
});
