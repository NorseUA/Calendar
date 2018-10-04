import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedDay, { Day } from './../Day';
import { getDayEvents } from './../renderDayBody';

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

const wrapper = shallow(<Day
  month={1}
  day={2}
  year={2017}
  eventsPending={false}
  eventsError={null}
  eventsReceived
  events={events}
  history={{}}
  eventActions={{}}
  monthActions={{}}
  yearActions={{}}
  dayActions={{}}
/>);

describe('Day Shallow Render', () => {
  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('case events received, sould contain month with year', () => {
    expect(wrapper.contains(<span>February, 2 Thursday
      </span>)).toBe(true);
    wrapper.setProps({ events: [], day: 1 });
    expect(wrapper.contains(<span>February, 1 Wednesday
        </span>)).toBe(true);
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


describe('Day Shallow Render, simulating click on buttons', () => {
  let yearActions;
  let monthActions;
  let dayActions;
  let history;

  beforeEach(() => {
    yearActions = {
      setYear: jest.fn()
    };
    monthActions = {
      setMonth: jest.fn()
    };
    dayActions = {
      setDay: jest.fn()
    };
    history = {
      push: jest.fn(),
      replace: jest.fn()
    };
  });

  it('simulate click on prev button, should set previous day', () => {
    const year = 2017;
    const month = 0;
    const day = 1;
    wrapper.setProps({
      eventsPending: false,
      eventsReceived: true,
      eventsError: null,
      history,
      yearActions,
      monthActions,
      dayActions,
      year,
      month,
      day
    });
    wrapper.find('#dayPrev').simulate('click');
    expect(yearActions.setYear).toHaveBeenCalledWith(2016);
    expect(monthActions.setMonth).toHaveBeenCalledWith(11);
    expect(dayActions.setDay).toHaveBeenCalledWith(31);
  });
  it('simulate click on next button, should set next day', () => {
    const year = 2017;
    const month = 11;
    const day = 31;
    wrapper.setProps({
      eventsPending: false,
      eventsReceived: true,
      eventsError: null,
      history,
      yearActions,
      monthActions,
      dayActions,
      year,
      month,
      day
    });
    wrapper.find('#dayNext').simulate('click');
    expect(yearActions.setYear).toHaveBeenCalledWith(2018);
    expect(monthActions.setMonth).toHaveBeenCalledWith(0);
    expect(dayActions.setDay).toHaveBeenCalledWith(1);
  });
});

describe('Day REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const mockStore = configureStore();
  const initialState = {
    year: 2017,
    day: 1,
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
      month: 'February',
      day: 1
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
  const wrapperСonnected = mount(<Provider store={store}>
    <ConnectedDay match={match} yearActions={{}} eventActions={eventActions} monthActions={{}} history={history} />
  </Provider>);

  it('render the connected(SMART) component', () => {
    expect(wrapperСonnected.find(ConnectedDay).length).toEqual(1);
  });

  it('rendered component has property year', () => {
    expect(wrapperСonnected.find(Day).prop('year')).toEqual(initialState.year);
  });
});

describe('function getDayEvents from renderDayBody', () => {
  it('should return correct number of day events', () => {
    expect(getDayEvents(2017, 1, 2, events).length).toEqual(2);
    expect(getDayEvents(2017, 1, 1, events).length).toEqual(0);
  });
});
