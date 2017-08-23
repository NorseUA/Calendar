import { SET_CONFIRM_MODAL_STATE } from '../../constants/Events';

const initialState = {
  confirmIsOpen: false
};

export default function confirmModal(state = initialState, action) {
  switch (action.type) {

    case SET_CONFIRM_MODAL_STATE:
      return {
        ...state,
        confirmIsOpen: action.payload
      };
    default:
      return state;
  }
}
