import React, {FC } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../../ui/modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { priceFormat, totalPriceSelector } from '../total-price/utils';
import { TTotalPrice } from '../../services/types/data';

interface IModalProps {
  number: number;
  price: TTotalPrice;
}

const modalRoot = document.getElementById('react-modals')!;

const Modal: FC<IModalProps> = ({ number, price }) => {

  return ReactDOM.createPortal(
    <section className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Спасибо за заказ!</h2>
        <p className={styles.text}>Номер заказа:</p>
        <p className={styles.number}>{number}</p>
        <p className={styles.text}>Итоговая сумма:</p>
        <p className={styles.price}>{priceFormat(price)}</p>
      </div>
      <ModalOverlay />
    </section>,
    modalRoot
  );
};

export default Modal;
