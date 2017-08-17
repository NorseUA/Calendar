import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import * as styles from './Modal.scss';


const ConfirmModal = props => (
  <ReactModal
    isOpen={props.isOpen}
    contentLabel="Minimal Modal Example"
    className={styles.modal}
    overlayClassName={styles.modalOverlay}
    onRequestClose={props.handleCancel}
    shouldCloseOnOverlayClick
  >
    <div className={styles.modalText}>{props.popupText}</div>
    <button className={styles.buttonPrimary} onClick={props.handleConfirm}>{props.closeLable}</button>
    <button className={styles.buttonPrimary} onClick={props.handleCancel}>{props.cancelLable}</button>
  </ReactModal>
);

ConfirmModal.propTypes = {
  popupText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  closeLable: PropTypes.string.isRequired,
  cancelLable: PropTypes.string.isRequired
};

export default ConfirmModal;
