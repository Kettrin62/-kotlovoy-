import React, { FC, useContext, useMemo } from 'react';
import { DeliveryContext, DeliveryFormContext, SelectedDeliveryContext } from '../../services/contexts/cart-context';
import { priceFormat } from '../total-price/utils';
import styles from './checkout-address.module.css';

interface ICheckoutAddressProps {
  extraClass: string
}

const CheckoutAddress: FC<ICheckoutAddressProps> = ({ extraClass }) => {
  const { form } = useContext(DeliveryFormContext);
  const { selectedDeliveryId } = useContext(SelectedDeliveryContext);
  const deliveryMethods = useContext(DeliveryContext);

  const deliveryMethod =
    deliveryMethods.
      find(method => method.id === selectedDeliveryId);

  const priceContent = useMemo(
    () => {
      return deliveryMethod?.price !== 0 ? (
        <p className={styles.price}>
          <span className={styles.span}>Стоимость: </span>
          {priceFormat(deliveryMethod?.price)}
        </p>
      ) : (
        <p className={styles.price}>Доставка оплачивается при получении</p>
      );
    },
    [deliveryMethod?.price]
  );
  

  return (
    <ul className={`${styles.container} ${extraClass}`}>
      <li className={styles.textbox}>
        <h3 className={styles.title}>Информация о доставке:</h3>
        <div className={styles.addressInfo}>
          {form?.index && <p className={styles.text}>
            <span className={styles.span}>Индекс: </span>
            {form?.index}
          </p>}
          {form?.region && <p className={styles.text}>
            <span className={styles.span}>Регион/Область: </span>
            {form?.region}
          </p>}
          {form?.city && <p className={styles.text}>
            <span className={styles.span}>Город/Насел.пункт: </span>
            {form?.city}
          </p>}
          {form?.address && <p className={styles.text}>
            <span className={styles.span}>Улица/Дом/Квартира: </span>
            {form?.address}
          </p>}
        </div>
        {form?.secondName && <p className={styles.text}>
          <span className={styles.span}>Фамилия получателя: </span>
          {form?.secondName}
        </p>}
        {form?.firstName && <p className={styles.text}>
          <span className={styles.span}>Имя получателя: </span>
          {form?.firstName}
        </p>}
        {form?.phone && <p className={styles.text}>
          <span className={styles.span}>Телефон: </span>
          {form?.phone}
        </p>}
        {form?.email && <p className={styles.text}>
          <span className={styles.span}>E-mail: </span>
          {form?.email}
        </p>}
        {form?.comment && <p className={styles.text}>
          <span className={styles.span}>Комментарий: </span>
          {form?.comment}
        </p>}
      </li>
      <li className={styles.textbox}>
        <h3 className={styles.title}>Выбранный тип доставки:</h3>
        <p className={styles.text}>{deliveryMethod?.company}</p>
        <p className={styles.text}>{deliveryMethod?.duration}</p>
        {priceContent}
      </li>
    </ul>
  );
};

export default CheckoutAddress;
