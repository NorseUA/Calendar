import { Thunk } from 'redux-testkit';
import {
  ADD_EVENT_FULFILLED,
  ADD_EVENT_PENDING,
  ADD_EVENT_REJECTED,
  ADD_EVENT_RETURN_TO_INITIAL_STATE,
  REMOVE_EVENT_FULFILLED,
  REMOVE_EVENT_PENDING,
  REMOVE_EVENT_REJECTED,
  REMOVE_EVENT_RETURN_TO_INITIAL_STATE,
  GET_EVENTS_FULFILLED,
  GET_EVENTS_PENDING,
  GET_EVENTS_REJECTED,
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_REJECTED,
  UPDATE_EVENT_RETURN_TO_INITIAL_STATE,
  SET_CONFIRM_MODAL_STATE,
  UPDATE_GENERAL_EVENTS,
  UPDATE_GENERAL_EVENTS_ID
} from '../../constants/Events';

import * as actions from '../EventActions';
import { utils } from '../../services/mockRequest';
import LocalStorageMock from '../../__mocks__/LocalStorageMock';

global.localStorage = new LocalStorageMock();

describe('action getEvents', () => {
  it('should get events on mockRequest resolved', async () => {
    utils.random = jest.fn(() => 5);
    const dispatches = await Thunk(actions.getEvents).execute();
    expect(dispatches.length).toBe(5);
    expect(dispatches.map(d => d.getType())).toEqual([
      GET_EVENTS_PENDING,
      ADD_EVENT_RETURN_TO_INITIAL_STATE,
      REMOVE_EVENT_RETURN_TO_INITIAL_STATE,
      UPDATE_EVENT_RETURN_TO_INITIAL_STATE,
      GET_EVENTS_FULFILLED
    ]);
  });
  it('should return an error on mockRequest rejected', async () => {
    utils.random = jest.fn(() => 11);
    const dispatches = await Thunk(actions.getEvents).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches.map(d => d.getType())).toEqual([
      GET_EVENTS_PENDING,
      GET_EVENTS_REJECTED
    ]);
  });
});


describe('action updateEvents', () => {
  it('should update given event on mockrequest resolved', async () => {
    utils.random = jest.fn(() => 5);
    const dispatches = await Thunk(actions.updateEvent).execute();
    expect(dispatches.length).toBe(3);
    expect(dispatches.map(d => d.getType())).toEqual([
      UPDATE_EVENT_PENDING,
      UPDATE_GENERAL_EVENTS,
      UPDATE_EVENT_FULFILLED
    ]);
  });

  it('should return an error on  update event mockrequest rejected', async () => {
    utils.random = jest.fn(() => 11);
    const dispatches = await Thunk(actions.updateEvent).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches.map(d => d.getType())).toEqual([
      UPDATE_EVENT_PENDING,
      UPDATE_EVENT_REJECTED
    ]);
  });
});


describe('action addEvent', () => {
  it('should add given event on mockrequest resolved', async () => {
    utils.random = jest.fn(() => 4);
    const dispatches = await Thunk(actions.addEvent).execute();
    expect(dispatches.length).toBe(4);
    expect(dispatches.map(d => d.getType())).toEqual([
      ADD_EVENT_PENDING,
      UPDATE_GENERAL_EVENTS,
      UPDATE_GENERAL_EVENTS_ID,
      ADD_EVENT_FULFILLED
    ]);
  });

  it('should return an error on mockrequest rejected', async () => {
    utils.random = jest.fn(() => 11);
    const dispatches = await Thunk(actions.addEvent).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches.map(d => d.getType())).toEqual([
      ADD_EVENT_PENDING,
      ADD_EVENT_REJECTED
    ]);
  });
});

describe('action removeEvent', () => {
  it('should add given event on mockrequest resolved', async () => {
    utils.random = jest.fn(() => 4);
    const dispatches = await Thunk(actions.removeEvent).execute();
    expect(dispatches.length).toBe(4);
    expect(dispatches.map(d => d.getType())).toEqual([
      REMOVE_EVENT_PENDING,
      UPDATE_GENERAL_EVENTS,
      SET_CONFIRM_MODAL_STATE,
      REMOVE_EVENT_FULFILLED
    ]);
  });

  it('should return an error on remove event mockrequest rejected', async () => {
    utils.random = jest.fn(() => 11);
    const dispatches = await Thunk(actions.removeEvent).execute();
    expect(dispatches.length).toBe(3);
    expect(dispatches.map(d => d.getType())).toEqual([
      REMOVE_EVENT_PENDING,
      SET_CONFIRM_MODAL_STATE,
      REMOVE_EVENT_REJECTED
    ]);
  });
});


describe('action setConfirmModalState', () => {
  it('should set confirm modal state', () => {
    const expected = { type: SET_CONFIRM_MODAL_STATE, payload: true };
    expect(actions.setConfirmModalState(true)).toEqual(expected);
  });
});
