import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedMonth, { Month } from './../Month';
import { months } from '../../../constants';

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


const wrapper = shallow(<Month
  month={0}
  day={1}
  year={2017}
  eventsPending={false}
  eventsError={null}
  eventsReceived
  events={events}
  history={{}}
  eventActions={{}}
  monthActions={{}}
  yearActions={{}}
/>);


describe('Month Shallow Render ', () => {
  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('case events received  , sould contain month with year', () => {
    const month = 0;
    const year = 2017;
    wrapper.setProps({ eventsPending: false, eventsReceived: true, month, year });
    expect(wrapper.contains(<span>{months[month]}, {year}</span>)).toBe(true);
    wrapper.setProps({ eventsPending: false, eventsReceived: true, month, year, events: [] });
    expect(wrapper.contains(<span>{months[month]}, {year}</span>)).toBe(true);
  });

  it('case events received (month 11), sould contain month with year', () => {
    const month = 11;
    const year = 2017;
    wrapper.setProps({ eventsPending: false, eventsReceived: true, month, year });
    expect(wrapper.contains(<span>{months[month]}, {year}</span>)).toBe(true);
  });

  it('case events received (currentMonth), sould contain month with year', () => {
    const month = 8;
    const year = 2017;
    wrapper.setProps({ eventsPending: false, eventsReceived: true, month, year });
    expect(wrapper.contains(<span>{months[month]}, {year}</span>)).toBe(true);
  });

  it('case events pending, sould contain loading', () => {
    wrapper.setProps({ eventsPending: true, eventsReceived: false });
    expect(wrapper.contains(<div>Loading ...</div>)).toBe(true);
  });

  it('case error received, sould contain error', () => {
    wrapper.setProps({ eventsPending: false, eventsReceived: false, eventsError: { message: 'Something wrong' } });
    expect(wrapper.contains(<div>Something wrong</div>)).toBe(true);
  });
});

describe('Month Shallow Render, simulating click on buttons', () => {
  it('simulate click on prev button, should set previous month', () => {
    const year = 2018;
    const month = 2;
    const yearActions = {
      setYear: jest.fn()
    };
    const monthActions = {
      setMonth: jest.fn()
    };
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    wrapper.setProps({
      eventsPending: false,
      eventsReceived: true,
      eventsError: null,
      history,
      yearActions,
      monthActions,
      year,
      month
    });
    wrapper.find('#monthPrev').simulate('click');
    expect(monthActions.setMonth).toHaveBeenCalledWith(1);
  });

  it('simulate click on next button, should set next month', () => {
    const year = 2018;
    const month = 2;
    const monthActions = {
      setMonth: jest.fn()
    };
    const yearActions = {
      setYear: jest.fn()
    };
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    wrapper.setProps({
      eventsPending: false,
      eventsReceived: true,
      eventsError: null,
      history,
      yearActions,
      monthActions,
      year,
      month
    });
    wrapper.find('#monthNext').simulate('click');
    expect(monthActions.setMonth).toHaveBeenCalledWith(3);
  });
});

describe('Month REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const mockStore = configureStore();
  const initialState = {
    year: 2017,
    day: { day: 1 },
    month: 1,
    getEvents: {
      events: [],
      received: false,
      pending: false,
      error: null
    }
  };
  const store = mockStore(initialState);
  const match = {
    params: {
      year: 2017,
      month: 'Fabruary'
    }
  };
  store.dispatch = jest.fn();
  const history = {};
  const eventActions = {
    getEvents: jest.fn(() => ({
      events: [],
      received: true,
      pending: false,
      error: null
    }))
  };

  const wrapperConnected = mount(<Provider store={store}>
    <ConnectedMonth match={match} yearActions={{}} eventActions={eventActions} monthActions={{}} history={history} />
  </Provider>);

  it('render the connected(SMART) component', () => {
    expect(wrapperConnected.find(ConnectedMonth).length).toEqual(1);
  });

  it('rendered component has property year', () => {
    expect(wrapperConnected.find(Month).prop('year')).toEqual(initialState.year);
  });
});
