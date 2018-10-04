import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedYear, { Year } from './Year';


const wrapper = shallow(<Year
  year={2018}
  eventsPending={false}
  eventsError={null}
  eventsReceived
  events={[]}
  history={{}}
  eventActions={{}}
  monthActions={{}}
  yearActions={{}}
/>);

describe('Year Shallow Render', () => {
  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('case events received, sould contain year ', () => {
    const year = 2018;
    wrapper.setProps({ eventsPending: false, eventsReceived: true, year });
    expect(wrapper.contains(<span>{year}</span>)).toBe(true);
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


describe('Year Shallow Render, simulating click on buttons', () => {
  it('simulate click on prev button, should set previous year', () => {
    const year = 2018;
    const yearActions = {
      setYear: jest.fn()
    };
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    wrapper.setProps({ eventsPending: false, eventsReceived: true, eventsError: null, history, yearActions, year });
    wrapper.find('#yearPrev').simulate('click');
    expect(yearActions.setYear).toHaveBeenCalledWith(2017);
    expect(history.push).toHaveBeenCalledWith('2017');
  });
  it('simulate click on next button, should set next year', () => {
    const year = 2018;
    const yearActions = {
      setYear: jest.fn()
    };
    const history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    wrapper.setProps({ eventsPending: false, eventsReceived: true, eventsError: null, history, yearActions, year });
    wrapper.find('#yearNext').simulate('click');
    expect(yearActions.setYear).toHaveBeenCalledWith(2019);
    expect(history.push).toHaveBeenCalledWith('2019');
  });
  it('simulate click on month title, should set month', () => {
    const year = 2018;
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
      year
    });
    wrapper.find('#FebruaryYear').simulate('click');
    expect(monthActions.setMonth).toHaveBeenCalledWith(1);
  });
});

describe('Year REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const mockStore = configureStore();
  const initialState = {
    year: 2017,
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
      year: 2017
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
    <ConnectedYear match={match} yearActions={{}} eventActions={eventActions} monthActions={{}} history={history} />
  </Provider>);

  it('render the connected(SMART) component', () => {
    expect(wrapperConnected.find(ConnectedYear).length).toEqual(1);
  });

  it('rendered component has property year', () => {
    expect(wrapperConnected.find(Year).prop('year')).toEqual(initialState.year);
  });
});
