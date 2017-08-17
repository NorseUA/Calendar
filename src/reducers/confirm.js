import { SET_CONFIRM_MODAL_STATE } from '../constants/Modals';

const initialState = {
  open: false
};

export default function confirm(state = initialState, action) {
  switch (action.type) {
    case SET_CONFIRM_MODAL_STATE:
      return { ...state, open: action.payload };
    default:
      return state;
  }
}
