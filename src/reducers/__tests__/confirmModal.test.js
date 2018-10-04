import { Reducer } from 'redux-testkit';
import { SET_CONFIRM_MODAL_STATE } from '../../constants/Events';
import confirmModal from '../events/confirmModal';


const initialState = {
  confirmIsOpen: false
};

describe('reducers/events/confirmModal', () => {
  it('should have initial state', () => {
    expect(confirmModal()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(confirmModal).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should set confirmIsOpen to action payload', () => {
    const action = { type: SET_CONFIRM_MODAL_STATE, payload: true };
    Reducer(confirmModal).expect(action).toReturnState({ ...initialState, confirmIsOpen: action.payload });
  });
});
