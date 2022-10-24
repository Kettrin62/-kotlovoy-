import React, { FC } from 'react';
import { TDataCartElement } from '../../services/types/data';
import { priceFormat } from '../total-price/utils';
import styles from './checkout-product.module.css';

interface ICheckoutProductProps {
  item: TDataCartElement
}

const CheckoutProduct: FC<ICheckoutProductProps> = ({ item }) => {
  const { element, qty } = item;
  const { id, images, title, cur_price } = element;
  const image = images[0].image;

  return (
    <div className={styles.product}>
      <div className={styles.leftbox}>
        <img className={styles.img} src={image} alt={title} />
        <p className={styles.text}>{title}</p>
      </div>
      <p className={styles.count}>×{qty}</p>
      <div className={styles.price}>
        <p className={styles.price} data-testid={`price-amount-${id}`}>
          {priceFormat(cur_price * qty)}
        </p>

      </div>
    </div>
  );
};

export default CheckoutProduct;
