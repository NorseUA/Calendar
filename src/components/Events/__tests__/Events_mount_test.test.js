import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedEvent, { Event } from './../Events';
import ConfirmModal from '../../Modals/ConfirmModal';
import SaveModal from '../../Modals/SaveModal';


const mockStore = configureStore();
const match = {
  params: {
    year: 2017,
    month: 'February',
    day: 1,
    eventId: '0'
  }
};

const initialState = {
  getEvents: {
    events: [{
      date: '2017-01-31T22:01:00.000Z',
      event: {
        description: 'description',
        endDay: 1,
        endHours: '02',
        endMinutes: '02',
        endMonth: 1,
        endYear: 2017,
        name: 'Hello',
        startDay: 1,
        startHours: '01',
        startMinutes: '01',
        startMonth: 1,
        startYear: 2017
      },
      id: 0
    }],
    errorIsOpen: false
  },
  addEvent: {
    pending: false,
    received: false,
    error: null
  },
  updateEvent: {
    pending: false,
    received: false,
    error: null
  },
  removeEvent: {
    pending: false,
    received: false,
    error: null
  },
  confirmModal: {
    confirmIsOpen: false
  },
  eventActions: {}
};


describe('Events REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const store = mockStore(initialState);


  const wrapper = mount(<Provider store={store}><ConnectedEvent
    pageName={'update event'}
    resetName={'cancel'}
    submitName={'update'}
    match={match}

  /></Provider>);
  it('render the connected(SMART) component', () => {
    expect(wrapper.find(ConnectedEvent).length).toEqual(1);
  });

  it('rendered component has property id', () => {
    expect(wrapper.find(Event).prop('id')).toBe(0);
  });

  it('rendered component has textarea', () => {
    expect(wrapper.find('textarea').prop('name')).toBe('description');
  });
  /* it('simulating click on delete button', () => {
    const button = wrapper.find('#delete');
    button.simulate('submit');
    console.log(wrapper);
    expect(wrapper.find(Event).prop('confirmIsOpen')).toBe(true);
  }); */
});


describe('Event (Mount + wrapping in <Provider>) with opened ConfirmModal', () => {
  const state = {
    ...initialState,
    confirmModal: {
      confirmIsOpen: true
    }
  };

  const store = mockStore(state);
  const wrapper = mount(<Provider store={store}><ConnectedEvent
    pageName={'update event'}
    resetName={'cancel'}
    submitName={'update'}
    match={match}
  /></Provider>);


  it('rendered component has Confirm Modal', () => {
    expect(wrapper.find(ConfirmModal).prop('isOpen')).toBe(true);
  });
});

describe('Event REACT-REDUX (Mount + wrapping in <Provider>) with opened SaveModal', () => {
  const state = {
    ...initialState,
    updateEvent: {
      pending: false,
      received: true,
      error: null
    }
  };
  const store = mockStore(state);
  const wrapper = mount(<Provider store={store}><ConnectedEvent
    pageName={'update event'}
    resetName={'cancel'}
    submitName={'update'}
    match={match}
  /></Provider>);

  it('rendered component has save modal', () => {
    expect(wrapper.find(SaveModal).prop('isOpen')).toBe(true);
  });
  it('rendered component has correct label', () => {
    expect(wrapper.find(SaveModal).prop('popupText')).toBe("You've successfully updated event");
  });
});

describe('Event REACT-REDUX (Mount + wrapping in <Provider>) with pending label', () => {
  const state = {
    ...initialState,
    updateEvent: {
      pending: true,
      received: false,
      error: null
    }
  };
  const store = mockStore(state);
  const wrapper = mount(<Provider store={store}><ConnectedEvent
    pageName={'update event'}
    resetName={'cancel'}
    submitName={'update'}
    match={match}
  /></Provider>);

  it('rendered component has save modal', () => {
    expect(wrapper.find('div').text()).toBe('Updating event...');
  });
});
