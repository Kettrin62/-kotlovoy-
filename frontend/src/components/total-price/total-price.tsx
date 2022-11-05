import React, { useMemo, FC, useContext, useEffect } from 'react';
import { MainButton } from '../../ui/main-button/main-button';
import styles from './total-price.module.css';
import { priceFormat, totalPriceSelector } from './utils';
import { Loader } from '../../ui/loader/loader';
import { DataCartContext } from '../../services/contexts/app-context';
import { CartStepContext, DeliveryFormContext, SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { stepName } from '../../utils/data';
import Text from '../text/text';
import { rawListeners } from 'process';
import api from '../../api';
import validator from 'validator';


export const TotalPrice = () => {
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice, totalDispatcher } = useContext(TotalPriceContext);
  const { step, setStep } = useContext(CartStepContext);
  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);
  const { form } = useContext(DeliveryFormContext);


  const orderCheckoutRequest = false;

  const prev = () => {
    const prevStep = step === stepName.checkout ? stepName.delivery : stepName.cart;
    setStep(prevStep);
  };

  const next = () => {
    if (step === stepName.delivery) {
      if (form.email && !validator.isEmail(form.email + '')) {
        console.log(!validator.isEmail(form.email + ''));
        
        alert('Некорректный адрес электронной почты')
      } else if (!form.firstName) {
        alert('Поле "Имя" должно быть заполнено')
      } else if (!form.secondName) {
        alert('Поле "Фамилия" должно быть заполнено')
      } else if (!form.phone || !validator.isMobilePhone(form.phone, ['ru-RU'])) {
        alert('Поле "Телефон" должно быть заполнено корректно')
      } else {
        const nextStep = step === stepName.cart ? stepName.delivery : stepName.checkout
        setStep(nextStep);
      }
    } else {
      const nextStep = step === stepName.cart ? stepName.delivery : stepName.checkout
      setStep(nextStep);
    }
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

  const { 
    comment,
    email,
    secondName,
    firstName,
    phone,
    index,
    region,
    city,
    address
  } = form;

  const confirmOrder = () => {
    const delivery = {
      id: selectedDeliveryId
    };
    const elements = dataCart.map(({ element, amount }) => {
      return {
        id: element.id,
        amount
      }
    })
    const dataOrder = {
      delivery,
      comment,
      email,
      last_name: secondName,
      first_name: firstName,
      phoneNumber: phone,
      postal_code: index,
      region,
      city,
      location: address,
      elements
    }
    api
      .postOrder(dataOrder)
      // .then(res => {
      //   console.log(res);
        
      // })
      .catch(err => console.log(err))
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
      <p className={styles.text}>{`Итого: ${priceFormat(totalPrice.price)}`}</p>
      <div className={styles.buttonbox}>
        {(step === stepName.delivery || step === stepName.checkout) && (
          <MainButton onClick={prev} type="button" secondary={true} extraClass={styles.button}>
            {buttonText}
          </MainButton>
        )}
        {(totalPrice.price !== 0) && (
          <MainButton onClick={nextAction} type="button">
            {orderCheckoutRequest ? <Loader size="small" inverse={true} /> : submitButtonText}
          </MainButton>
        )}
      </div>
    </div>
  );
};
