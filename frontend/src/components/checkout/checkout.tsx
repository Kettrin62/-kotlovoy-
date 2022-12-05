import { FC, useContext, useEffect } from 'react';
import styles from './checkout.module.css';
import CheckoutProduct from '../checkout-product/checkout-product';
import CheckoutAddress from '../checkout-address/checkout-address';
import { DataCartContext, DeliveryContext } from '../../services/contexts/app-context';
import { SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { TDataCartElement, TDataElement } from '../../services/types/data';

interface CheckoutProps {
  elements: TDataCartElement<TDataElement>[];
}

export const Checkout: FC<CheckoutProps> = ({ elements }) => {
  const deliveryMethods = useContext(DeliveryContext);
  const { dataCart } = useContext(DataCartContext);
  const { totalDispatcher } = useContext(TotalPriceContext);
  const { selectedDeliveryId } = useContext(SelectedDeliveryContext);

  useEffect(() => {
    totalDispatcher({ 
      array: elements, 
      delivery: {
        methods: deliveryMethods,
        selectedMethod: selectedDeliveryId
      }
    })
  }, [dataCart, selectedDeliveryId, elements]);

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Товары:</h3>
      <ul className={styles.list}>
        {elements.map((item, index) => {
          return <CheckoutProduct key={index} item={item} />;
        })}
      </ul>
      <CheckoutAddress extraClass={styles.address} />
    </section>
  );
};
