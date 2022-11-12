import React, { FC } from 'react';
import { TDataCartElement, TDataElement } from '../../services/types/data';
import { priceFormat } from '../total-price/utils';
import styles from './checkout-product.module.css';

interface ICheckoutProductProps {
  item: TDataCartElement<TDataElement>
}

const CheckoutProduct: FC<ICheckoutProductProps> = ({ item }) => {
  const { element, amount } = item;
  const { id, images, title, cur_price } = element;
  const image = images[0].image;

  return (
    <li className={styles.product}>
      <div className={styles.leftbox}>
        <img className={styles.img} src={image} alt={title} />
        <p className={styles.text}>{title}</p>
      </div>
      <div className={styles.box}>
        <p className={styles.count}>×{amount}</p>
        <p className={styles.price} data-testid={`price-amount-${id}`}>
          {priceFormat(cur_price * amount)}
        </p>
      </div>
    </li>
  );
};

export default CheckoutProduct;
