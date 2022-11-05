import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseButton from '../../ui/close-button/close-button';
import { ModalOverlay } from '../../ui/modal-overlay/modal-overlay';
import styles from './modal.module.css';


const modalRoot = document.getElementById('react-modals')!;

interface IIModalProps {
  header: string;
  onClose: () => void;
  extraClass?: string;
  children: React.ReactNode;
}

const Modal: FC<IIModalProps> = ({ header, extraClass, onClose, children }) => {

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [onClose])


  return ReactDOM.createPortal (
    <section className={`${styles.container} ${extraClass}`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{header}</h3>
          <CloseButton onClose={onClose}/>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </section>,
    modalRoot
  );
};

export default Modal;
