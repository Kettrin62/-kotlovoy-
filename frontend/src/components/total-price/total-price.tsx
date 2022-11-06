import React, { useMemo, FC, useContext, useCallback, useState } from 'react';
import { 
  useHistory,
  useLocation
} from 'react-router-dom';
import { MainButton } from '../../ui/main-button/main-button';
import styles from './total-price.module.css';
import { priceFormat, totalPriceSelector } from './utils';
import { Loader } from '../../ui/loader/loader';
import { DataCartContext } from '../../services/contexts/app-context';
import { CartStepContext, DeliveryFormContext, SelectedDeliveryContext, TotalPriceContext } from '../../services/contexts/cart-context';
import { formDeliveryInit, stepName } from '../../utils/data';
import Text from '../text/text';
import { rawListeners } from 'process';
import api from '../../api';
import validator from 'validator';
import Modal from '../modal/modal';


export const TotalPrice = () => {
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalPrice, totalDispatcher } = useContext(TotalPriceContext);
  const { step, setStep } = useContext(CartStepContext);
  const { selectedDeliveryId, setSelectedDeliveryId } = useContext(SelectedDeliveryContext);
  const { form, setForm } = useContext(DeliveryFormContext);
  const [ orderCheckoutRequest, setOrderCheckoutRequest] = useState(false);
  const [ order, setOrder ] = useState('');
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );

  const prev = () => {
    const prevStep = step === stepName.checkout ? stepName.delivery : stepName.cart;
    setStep(prevStep);
  };

  const next = () => {
    if (step === stepName.delivery) {
      if (form.email && !validator.isEmail(form.email + '')) {
        alert('Некорректный адрес электронной почты')
      } else if (!form.firstName) {
        alert('Поле "Имя" должно быть заполнено')
      } else if (!form.secondName) {
        alert('Поле "Фамилия" должно быть заполнено')
      } else if (!form.phone ||
        (form.phone && !form.phone.match(/^(\+7|8)[\d]{10}$/))) {
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
    setOrderCheckoutRequest(true);
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
      .then(res => {
        setOrderCheckoutRequest(false);
        setOrder(res.number);
        setVisible(true);
      })
      .catch(err => {
        console.log(err);
        if (err.phoneNumber) {
          console.log('ppp');
          setVisible(true);
        }
        setOrderCheckoutRequest(false);
      })
  };

  const nextAction = step === stepName.delivery || step === stepName.cart ? next : confirmOrder;

  if (totalPrice.price === 0) {
    return (
      <Text
        class=''
        text='Ваша корзина пуста'
      />
    )
  };

  const handleCloseModal = () => {
    setVisible(false);
    if (order) {
      setDataCart([]);
      setStep('');
      setForm(formDeliveryInit)
      onClickMain();
    }
  };

  const modal = (
    <Modal header={order ? `Заказ № ${order} оформлен` : 'Заказ не может быть оформлен!'} onClose={handleCloseModal}>
      <p className={styles.modaltext}>{order ? 'В ближайшее время мы с Вами свяжемся!' : 'Введён некорректный номер телефона'}</p>
    </Modal>
  );


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
        {visible && modal}
      </div>
    </div>
  );
};
