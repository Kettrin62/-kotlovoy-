import React, { useMemo, FC, useContext, useEffect } from 'react';
import { MainButton } from '../../ui/main-button/main-button';
import styles from './total-price.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { NEXT_STEP, PREVIOUS_STEP } from '../../services/actions';
// import { orderCheckout } from '../../services/actions/checkout';
import { priceFormat, totalPriceSelector } from './utils';
import { Loader } from '../../ui/loader/loader';
import { DataCartContext } from '../../services/contexts/app-context';
import { TotalPriceContext } from '../../services/contexts/cart-context';

interface ITotalPriceProps {
  step: string;
}

export const TotalPrice: FC<ITotalPriceProps> = ({ step }) => {
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice } = useContext(TotalPriceContext);

  const orderCheckoutRequest = false;


  const prev = () => {
    
  };

  const next = () => {

  };

  const submitButtonText = step === 'checkout' ? 'Оформить заказ' : 'Продолжить оформление';

  const buttonText = useMemo(
    () => {
      if (step === 'delivery') {
        return 'Назад к списку покупок';
      } else if (step === 'checkout') {
        return 'Назад к выбору доставки';
      } else {
        return '';
      }
    },
    [step]
  );

  const confirmOrder = () => {

  };

  const nextAction = step === 'delivery' || step === 'cart' ? next : confirmOrder;

  return (
    <div className={`${styles.container}`}>
      <p className={styles.text}>Итого:</p>
      <p className={styles.cost}>{priceFormat(totalPrice.price)}</p>
      <div className={styles.buttonbox}>
        {(step === 'delivery' || step === 'checkout') && (
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
