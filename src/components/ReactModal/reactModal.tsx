import React, { MouseEventHandler, ReactElement } from 'react';
import ReactDom from 'react-dom';
import styles from './reactModal.module.css';
import { CloseIcon } from '../Icons';

type ModalProps = {
  open: boolean;
  children: ReactElement;
  onClose: MouseEventHandler;
  size?: string;
  disableOutsideClick?: boolean;
};

const ReactModal = ({ open, children, onClose, size, disableOutsideClick }: ModalProps) => {
  if (!open) return null;
  const closeOnOutsideClose = disableOutsideClick !== false;
  const modalSizeCls = size && size !== '' ? styles[size] : '';

  const noClose = () => {
    console.log('outside click is disabled');
  };

  return ReactDom.createPortal(
    <>
      <div className={styles.modalContainer} onClick={closeOnOutsideClose ? onClose : noClose} />
      <div className={`${styles.modalBackground} ${modalSizeCls}`}>
        <button onClick={onClose} className={styles.closeIcon}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('nextPortal')
  );
};
export default ReactModal;
