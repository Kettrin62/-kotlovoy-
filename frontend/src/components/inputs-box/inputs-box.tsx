import React, { useState, useRef, useContext, useEffect } from 'react';
import styles from './inputs-box.module.css';
import Input from '../../ui/input/input';
import { DeliveryFormContext } from '../../services/contexts/cart-context';

export const InputsBox = () => {
  const { form, setForm } = useContext(DeliveryFormContext);
  // const { deliveryForm } = useSelector(state => state.delivery);
  const [indexValue, setIndexValue] = useState('');
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
    setForm({
      ...form,
      index: e.target.value
    })
  };

  const [regionValue, setRegionValue] = useState('');
  const onChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionValue(e.target.value);
    setForm({
      ...form,
      region: e.target.value
    })
  };

  const [cityValue, setCityValue] = useState('');
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityValue(e.target.value);
    setForm({
      ...form,
      city: e.target.value
    })
  };
  const [addressValue, setAddressValue] = useState('');
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
    setForm({
      ...form,
      address: e.target.value
    })
  };
  const [secondNameValue, setSecondNameValue] = useState('');
  const onChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondNameValue(e.target.value);
    setForm({
      ...form,
      secondName: e.target.value
    })
  };
  const [firstNameValue, setFirstNameValue] = useState('');
  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameValue(e.target.value);
    setForm({
      ...form,
      firstName: e.target.value
    })
  };
  const [phoneValue, setPhoneValue] = useState('');
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);
    setForm({
      ...form,
      phone: e.target.value
    })
  };
  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setForm({
      ...form,
      email: e.target.value
    })
  };
  const [commentValue, setCommentValue] = useState('');
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
    setForm({
      ...form,
      comment: e.target.value
    })
  };


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch({ type: SET_DELIVERY_FORM_VALUE, field: e.target.name, value: e.target.value });

  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (form) {
      form.index && setIndexValue(form.index);
      form.region && setRegionValue(form.region);
      form.city && setCityValue(form.city);
      form.address && setAddressValue(form.address);
      form.secondName && setSecondNameValue(form.secondName);
      form.firstName && setFirstNameValue(form.firstName);
      form.phone && setPhoneValue(form.phone);
      form.email && setEmailValue(form.email);
      form.comment && setCommentValue(form.comment);
    }
  }, []);

  return (
    <div className={`${styles.container}`}>
      <ul className={styles.row}>
        <li className={`${styles.input} ${styles.inputFlex}`}>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="index">
              Индекс
            </label>
            <Input
              onChange={onChangeIndex}
              name={'index'}
              value={indexValue}
              extraClass={styles.input}
              type="text"
              id="index"
              inputRef={inputRef}
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="region">
              Регион/Область
            </label>
            <Input
              onChange={onChangeRegion}
              name={'region'}
              value={regionValue}
              extraClass={styles.input}
              type="text"
              id="region"
              inputRef={inputRef}
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="city">
              Город/Насел.пункт
            </label>
            <Input
              onChange={onChangeCity}
              name={'city'}
              value={cityValue}
              extraClass={styles.input}
              type="text"
              id="city"
              inputRef={inputRef}
            />
          </div>
        </li>
        <li className={`${styles.input} ${styles.floor}`}>
          <label className={styles.label} htmlFor="address">
            Улица/Дом/Квартира
          </label>
          <Input
            onChange={onChangeAddress}
            name={'address'}
            value={addressValue}
            extraClass={styles.input}
            type="text"
            id="address"
            inputRef={inputRef}
          />
        </li>
      </ul>
      <ul className={styles.row}>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="secondName">
            Фамилия получателя
          </label>
          <Input
            onChange={onChangeSecondName}
            name={'secondName'}
            value={secondNameValue}
            type="text"
            extraClass={styles.input}
            id="secondName"
            placeholder="Введите фамилию"
            inputRef={inputRef}
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="firstName">
            Имя получателя
          </label>
          <Input
            onChange={onChangeFirstName}
            name={'firstName'}
            value={firstNameValue}
            type="text"
            extraClass={styles.input}
            id="firstName"
            placeholder="Введите имя"
            inputRef={inputRef}
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="phone">
            Телефон
          </label>
          <Input
            onChange={onChangePhone}
            name={'phone'}
            value={phoneValue}
            extraClass={styles.input}
            type="tel"
            id="phone"
            placeholder="+7"
            inputRef={inputRef}
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="email">
            E-mail
          </label>
          <Input
            onChange={onChangeEmail}
            name={'email'}
            value={emailValue}
            extraClass={styles.input}
            type="email"
            id="email"
            placeholder="email@mail.ru"
            inputRef={inputRef}
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="comment">
            Комментарий
          </label>
          <Input
            onChange={onChangeComment}
            name={'comment'}
            value={commentValue}
            extraClass={styles.input}
            type="text"
            id="comment"
            inputRef={inputRef}
          />
        </li>
      </ul>
    </div>
  );
};

export default InputsBox;
