import { SET_SAVE_MODAL_STATE } from '../constants/Modals';

const initialState = {
  open: false
};

export default function save(state = initialState, action) {
  switch (action.type) {
    case SET_SAVE_MODAL_STATE:
      return { ...state, open: action.payload };
    default:
      return state;
  }
}
