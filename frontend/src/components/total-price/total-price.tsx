import React, { useMemo, FC, useContext, useEffect } from 'react';
import { MainButton } from '../../ui/main-button/main-button';
import styles from './total-price.module.css';
import { priceFormat, totalPriceSelector } from './utils';
import { Loader } from '../../ui/loader/loader';
import { DataCartContext } from '../../services/contexts/app-context';
import { CartStepContext, SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { deliveryMethods, stepName } from '../../utils/data';
import Text from '../text/text';


export const TotalPrice = () => {
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice, totalDispatcher } = useContext(TotalPriceContext);
  const { step, setStep } = useContext(CartStepContext);
  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);



  const orderCheckoutRequest = false;

  // useEffect(() => {
  //   totalDispatcher({ 
  //     array: dataCart, 
  //     delivery: {
  //       methods: deliveryMethods,
  //       selectedMethod: selectedDeliveryId
  //     }
  //   })
  // }, [dataCart, selectedDeliveryId]);

  const prev = () => {
    const prevStep = step === stepName.checkout ? stepName.delivery : stepName.cart;
    setStep(prevStep);
  };

  const next = () => {
    const nextStep = step === stepName.cart ? stepName.delivery : stepName.checkout
    setStep(nextStep);
  };

  const submitButtonText = step === stepName.checkout ? 'Оформить заказ' : 'Продолжить оформление';

  const buttonText = useMemo(
    () => {
      if (step === stepName.delivery) {
        return 'Назад к списку покупок';
      } else if (step === stepName.checkout) {
        return 'Назад к выбору доставки';
      } else {
        return '';
      }
    },
    [step]
  );

  const confirmOrder = () => {

  };

  const nextAction = step === stepName.delivery || step === stepName.cart ? next : confirmOrder;

  if (totalPrice.price === 0) {
    return (
      <Text
        class=''
        text='Ваша корзина пуста'
      />
    )
  }

  return (
    <div className={`${styles.container}`}>
      <p className={styles.text}>Итого:</p>
      <p className={styles.cost}>{priceFormat(totalPrice.price)}</p>
      <div className={styles.buttonbox}>
        {(step === stepName.delivery || step === stepName.checkout) && (
          <MainButton onClick={prev} type="button" secondary={true} extraClass={styles.button}>
            {buttonText}
          </MainButton>
        )}
        {(totalPrice.price !== 0) && (<MainButton onClick={nextAction} type="button">
          {orderCheckoutRequest ? <Loader size="small" inverse={true} /> : submitButtonText}
        </MainButton>
        )}
      </div>
    </div>
  );
};
