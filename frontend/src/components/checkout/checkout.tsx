import React, { useContext, useEffect } from 'react';
import styles from './checkout.module.css';
import CheckoutProduct from '../checkout-product/checkout-product';
import Modal from '../modal/modal';
import CheckoutAddress from '../checkout-address/checkout-address';
import { DataCartContext } from '../../services/contexts/app-context';
import { SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { deliveryMethods } from '../../utils/data';


export const Checkout = () => {
  // const { items } = useSelector(state => state.cart);
  // const { order } = useSelector(state => state.checkout);
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice, totalDispatcher } = useContext(TotalPriceContext);
  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);

  useEffect(() => {
    totalDispatcher({ 
      array: dataCart, 
      delivery: {
        methods: deliveryMethods,
        selectedMethod: selectedDeliveryId
      }
    })
  }, [dataCart, selectedDeliveryId]);

  const order = null;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Товары:</h3>
      {dataCart.map((item, index) => {
        return <CheckoutProduct key={index} item={item} />;
      })}
      <CheckoutAddress extraClass={styles.address} />
      {/* {!!order && !!order.id && <Modal number={order.id} price={totalPrice} />} */}
      {!!order && <Modal number={order} price={totalPrice} />}
    </section>
  );
};
