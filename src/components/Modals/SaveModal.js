import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import * as styles from './Modal.scss';


const SaveModal = props => (
  <ReactModal
    isOpen={props.isOpen}
    contentLabel="Minimal Modal Example"
    className={styles.modal}
    overlayClassName={styles.modalOverlay}
    onRequestClose={props.handleConfirm}
    shouldCloseOnOverlayClick
  >
    <div className={styles.modalText}>{props.popupText}</div>
    <button className={styles.buttonPrimary} onClick={props.handleConfirm}>{props.closeLable}</button>
  </ReactModal>
);

SaveModal.propTypes = {
  popupText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func,
  closeLable: PropTypes.string.isRequired
};

export default SaveModal;
