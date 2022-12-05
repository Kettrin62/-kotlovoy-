import { 
  useMemo, 
  FC, 
  useContext, 
  useCallback, 
  useState 
} from 'react';
import { useHistory } from 'react-router-dom';
import { MainButton } from '../../ui/main-button/main-button';
import styles from './total-price.module.css';
import { priceFormat } from './utils';
import { Loader } from '../../ui/loader/loader';
import { DataCartContext } from '../../services/contexts/app-context';
import { 
  CartStepContext, 
  DeliveryFormContext, 
  SelectedDeliveryContext, 
  TotalPriceContext 
} from '../../services/contexts/cart-context';
import { formDeliveryInit, stepName } from '../../utils/data';
import Text from '../text/text';
import api from '../../api';
import validator from 'validator';
import Modal from '../modal/modal';
import { TDataCartElement, TDataElement } from '../../services/types/data';

interface TotalPriceProps {
  cartElements: TDataCartElement<TDataElement>[];
}

export const TotalPrice: FC<TotalPriceProps> = ({ cartElements }) => {
  const { setDataCart } = useContext(DataCartContext);
  const { totalPrice } = useContext(TotalPriceContext);
  const { step, setStep } = useContext(CartStepContext);
  const { selectedDeliveryId } = useContext(SelectedDeliveryContext);
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
        setError('Введён некорректный адрес электронной почты');
        setVisible(true);
      } else if (!form.firstName) {
        setError('Поле "Имя" должно быть заполнено');
        setVisible(true);
      } else if (!form.secondName) {
        setError('Поле "Фамилия" должно быть заполнено');
        setVisible(true);
      } else if (!form.phone ||
        (form.phone && !form.phone.match(/^(\+7|8)[\d]{10}$/))) {
        setError('Поле "Телефон" должно быть заполнено корректно');
        setVisible(true);
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

  const [error, setError] = useState('');

  const confirmOrder = () => {
    setOrderCheckoutRequest(true);
    const delivery = {
      id: selectedDeliveryId
    };
    const elements = cartElements.map(({ element, amount }) => {
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
    setOrderCheckoutRequest(true);
    api
      .postOrder(dataOrder)
      .then(res => {
        setOrderCheckoutRequest(false);
        setOrder(res.number);
        setVisible(true);
      })
      .catch(err => {
        if (err.phoneNumber) {
          setError('Введён некорректный номер телефона');
          setVisible(true);
        }
        if (err.elements) {
          setError('Пока Вы оформляли заказ, некоторые позиции раскупили. Попробуйте оформить заказ заново.');
          setVisible(true);
        }
        setOrderCheckoutRequest(false);
      })
  };

  const nextAction = step === stepName.delivery || step === stepName.cart ? next : confirmOrder;

  if (cartElements.length === 0) {
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
    if (step === stepName.checkout && !order) {
      setForm({
        ...form,
        phone: '',
      })
      if (error === 'Введён некорректный номер телефона') {
        setStep(stepName.delivery)
      } else setStep(stepName.cart);
    }
  };

  const modal = (
    <Modal header={order ? `Заказ № ${order} оформлен` : 'Заказ не может быть оформлен!'} onClose={handleCloseModal}>
      <p className={styles.modaltext}>{order ? 'В ближайшее время мы с Вами свяжемся!' : error}</p>
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
        {(cartElements.length !== 0) && (
          <MainButton onClick={nextAction} type="button">
            {orderCheckoutRequest ? <Loader size="small" inverse={true} /> : submitButtonText}
          </MainButton>
        )}
        {visible && modal}
      </div>
    </div>
  );
};
