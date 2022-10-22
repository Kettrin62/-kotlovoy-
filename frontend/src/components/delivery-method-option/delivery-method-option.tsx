import React, { FC } from 'react';
import { useContext } from 'react';
import { SelectedDeliveryContext } from '../../services/contexts/cart-context';
import { priceFormat } from '../total-price/utils';
import styles from './delivery-method-option.module.css';

interface IDeliveryMethodOptionProps {
  thumb: string;
  id: number;
  text: string;
  duration: string;
  price: number;
  checked: boolean;
}

const DeliveryMethodOption: FC<IDeliveryMethodOptionProps> = ({ 
  thumb,
  id, 
  text, 
  duration, 
  price, 
  checked
}) => {

  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);

  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDeliveryId(id);
  };

  return (
    <li className={`${styles.option} ${checked && styles['option-checked']} `}>
      <input
        name="method"
        type="radio"
        id={id + ''}
        className={styles.input}
        checked={checked}
        onChange={onClick}
      />
      <label htmlFor={id + ''}>
        <div className={styles.leftbox}>
          <img className={styles.img} src={thumb} alt="Изображение способа доставки" />
          <p className={styles.text}>{text}</p>
        </div>
      </label>
      <p className={styles.duration}>{duration} дней</p>
      <p className={styles.price}>{priceFormat(price)}</p>
    </li>
  );
};

export default DeliveryMethodOption;
