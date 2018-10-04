import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedApp, { App } from './App';

describe('App Shallow Render,  case events received', () => {
  const year = 2018;
  const wrapper = shallow(<App
    year={year}
  />);
  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });
});


describe('App REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const mockStore = configureStore();
  const initialState = {
    year: { year: 2017 }
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}>
    <ConnectedApp />
  </Provider>);

  it('render the connected(SMART) component', () => {
    expect(wrapper.find(ConnectedApp).length).toEqual(1);
  });

  it('rendered component has property year', () => {
    expect(wrapper.find(App).prop('year')).toEqual(initialState.year.year);
  });
});
