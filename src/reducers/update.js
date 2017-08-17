import { SET_UPDATE_MODAL_STATE } from '../constants/Modals';

const initialState = {
  open: false
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case SET_UPDATE_MODAL_STATE:
      return { ...state, open: action.payload };
    default:
      return state;
  }
}
