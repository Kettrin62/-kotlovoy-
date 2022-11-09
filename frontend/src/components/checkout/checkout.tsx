import React, { useContext, useEffect } from 'react';
import styles from './checkout.module.css';
import CheckoutProduct from '../checkout-product/checkout-product';
// import Modal from '../modal/modal';
import CheckoutAddress from '../checkout-address/checkout-address';
import { DataCartContext, DeliveryContext } from '../../services/contexts/app-context';
import { SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';


export const Checkout = () => {
  // const { items } = useSelector(state => state.cart);
  const deliveryMethods = useContext(DeliveryContext);
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
      <ul className={styles.list}>
        {dataCart.map((item, index) => {
          return <CheckoutProduct key={index} item={item} />;
        })}
      </ul>
      <CheckoutAddress extraClass={styles.address} />
      {/* {!!order && <Modal number={order} price={totalPrice} />} */}
    </section>
  );
};
