import React, { useMemo, FC, useContext, useEffect } from 'react';
import { MainButton } from '../../ui/main-button/main-button';
import styles from './total-price.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { NEXT_STEP, PREVIOUS_STEP } from '../../services/actions';
// import { orderCheckout } from '../../services/actions/checkout';
import { priceFormat, totalPriceSelector } from './utils';
import { Loader } from '../../ui/loader/loader';
import { DataCartContext, CartStepContext } from '../../services/contexts/app-context';
import { TotalPriceContext } from '../../services/contexts/cart-context';
import { stepName } from '../../utils/data';



export const TotalPrice = () => {
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice } = useContext(TotalPriceContext);
  const { step, setStep } = useContext(CartStepContext);
  


  const orderCheckoutRequest = false;


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
        <MainButton onClick={nextAction} type="button">
          {orderCheckoutRequest ? <Loader size="small" inverse={true} /> : submitButtonText}
        </MainButton>
      </div>
    </div>
  );
};
