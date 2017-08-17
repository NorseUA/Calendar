import { SET_CONFIRM_MODAL_STATE, SET_SAVE_MODAL_STATE, SET_UPDATE_MODAL_STATE } from '../constants/Modals';

export function setConfirmModalState(state) {
  return {
    type: SET_CONFIRM_MODAL_STATE,
    payload: state
  };
}
export function setSaveModalState(state) {
  return {
    type: SET_SAVE_MODAL_STATE,
    payload: state
  };
}
export function setUpdateModalState(state) {
  return {
    type: SET_UPDATE_MODAL_STATE,
    payload: state
  };
}
