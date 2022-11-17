import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './checkout.module.css';
import CheckoutProduct from '../checkout-product/checkout-product';
// import Modal from '../modal/modal';
import CheckoutAddress from '../checkout-address/checkout-address';
import { DataCartContext, DeliveryContext } from '../../services/contexts/app-context';
import { SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { TDataCartElement, TDataElement } from '../../services/types/data';
import api from '../../api';

interface CheckoutProps {
  elements: TDataCartElement<TDataElement>[];
}


export const Checkout: FC<CheckoutProps> = ({ elements }) => {
  // const { items } = useSelector(state => state.cart);
  const deliveryMethods = useContext(DeliveryContext);
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice, totalDispatcher } = useContext(TotalPriceContext);
  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);
  


  useEffect(() => {
    totalDispatcher({ 
      array: elements, 
      delivery: {
        methods: deliveryMethods,
        selectedMethod: selectedDeliveryId
      }
    })
  }, [dataCart, selectedDeliveryId, elements]);

  const order = null;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Товары:</h3>
      <ul className={styles.list}>
        {elements.map((item, index) => {
          return <CheckoutProduct key={index} item={item} />;
        })}
      </ul>
      <CheckoutAddress extraClass={styles.address} />
      {/* {!!order && <Modal number={order} price={totalPrice} />} */}
    </section>
  );
};
