import React, { FC } from 'react';
import { TDataCartElement } from '../../services/types/data';
import styles from './checkout-product.module.css';

interface ICheckoutProductProps {
  item: TDataCartElement
}

const CheckoutProduct: FC<ICheckoutProductProps> = ({ item }) => {
  const { element, qty } = item;
  const { images, title } = element;
  const image = images[0].image;
  

  return (
    <div className={styles.product}>
      <div className={styles.leftbox}>
        <img className={styles.img} src={image} alt={title} />
        <p className={styles.text}>{title}</p>
      </div>
      <p className={styles.count}>×{qty}</p>
    </div>
  );
};

export default CheckoutProduct;
