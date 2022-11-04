import React, { useEffect, useMemo } from 'react';
import styles from './delivery-method.module.css';
import { Loader } from '../../ui/loader/loader';
import DeliveryMethodOption from '../delivery-method-option/delivery-method-option';
import express from '../../images/express.svg';
import standart from '../../images/standart.svg';
import { useContext } from 'react';
import { SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { DataCartContext, DeliveryContext } from '../../services/contexts/app-context';
import api from '../../api';

const DeliveryMethod = () => {

  const deliveryMethodsRequest = false;

  const deliveryMethods = useContext(DeliveryContext);
  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);

  const { dataCart, setDataCart } = useContext(DataCartContext);

  const { totalDispatcher } = useContext(TotalPriceContext);

  useEffect(() => {
    totalDispatcher({ 
      array: dataCart, 
      delivery: {
        methods: deliveryMethods,
        selectedMethod: selectedDeliveryId
      }
    })
  }, [dataCart, selectedDeliveryId]);


  const content = useMemo(
    () => {
      return deliveryMethodsRequest ? (
        <Loader size="large" />
      ) : (
        <ul className={styles.options}>
          {deliveryMethods.map((item, index) => {
            return (
              <DeliveryMethodOption
                key={index}
                {...item}
                checked={item.id === selectedDeliveryId}
              />
            );
          })}
        </ul>
      );
    },
    [deliveryMethodsRequest, deliveryMethods, selectedDeliveryId]
  );
  return (
    <div className={`${styles.container}`}>
      <h3 className={styles.title}>Выберите способ доставки:</h3>
      {content}
    </div>
  );
};

export default DeliveryMethod;
