import React, { useState, useRef, useContext, useEffect } from 'react';
import styles from './inputs-box.module.css';
import Input from '../../ui/input/input';
import { DeliveryFormContext } from '../../services/contexts/cart-context';
import { UserContext } from '../../services/contexts/user-context';
import { TDeliveryForm } from '../../services/types/data';
import { AuthContext } from '../../services/contexts/auth-context';
import validator from 'validator';
import cn from 'classnames';

export const InputsBox = () => {
  const { form, setForm } = useContext(DeliveryFormContext);
  const { user } = useContext(UserContext);
  const { auth } = useContext(AuthContext)
  const [formChange, setFormChange] = useState(false);
  const [textError, setTextError] = useState({
    phoneNumber: '',
    email: '',
  });

  let obj: TDeliveryForm = {};
  const inputRef = useRef(null);

  const [index, setIndex] = useState('');
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value.replace(/\D/g, '').slice(0, 6));
    obj = form;
    obj = ({
      ...obj,
      index: e.target.value,
    });
    setForm(obj);
  };

  const [region, setRegion] = useState('');
  const onChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      region: e.target.value,
    });
    setForm(obj);
  };

  const [city, setCity] = useState('');
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      city: e.target.value,
    });
    setForm(obj);
  };
  const [address, setAddress] = useState('');
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      address: e.target.value,
    });
    setForm(obj);
  };
  const [secondName, setSecondName] = useState('');
  const onChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondName(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      secondName: e.target.value,
    });
    setForm(obj);
  };
  const [firstName, setFirstName] = useState('');
  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      firstName: e.target.value,
    });
    setForm(obj);
  };
  const [phone, setPhone] = useState('+7');
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\+\d]+$/g, '').replace(/^7|^8/, '+7');

    if (value[0] !== '+' || (!value.match(/^(\+7|8)[\d]{10}$/) && value.length < 13)) {
      setTextError({
        ...textError,
        phoneNumber: 'Введите корректный номер телефона'
      })
    } else {
      setTextError({
        ...textError,
        phoneNumber: ''
      });
    }
    if (value.length < 13) {
    setPhone(value);
    obj = form;
    obj = ({
      ...obj,
      phone: e.target.value,
    });
    setForm(obj);
    }
  };
  const [email, setEmail] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      email: e.target.value,
    });
    setForm(obj);
    if (e.target.value && !validator.isEmail(e.target.value)) {
      setTextError({
        ...textError,
        email: 'Введите правильный адрес электронной почты'
      })
    } else setTextError({
      ...textError,
      email: ''
    });
  };
  const [comment, setComment] = useState('');
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    obj = form;
    obj = ({
      ...obj,
      comment: e.target.value,
    });
    setForm(obj);
  };

  useEffect(() => {
    if (user && form && !form.done) {
      obj = form;
      obj = ({
        ...obj,
        done: true,
      })
      obj = form.email ? ({
        ...obj,
        email: form.email,
      }) : ({
        email: user.email,
      });
      obj = form.firstName ? ({
        ...obj,
        firstName: form.firstName,
      }) : ({
        ...obj,
        firstName: user.first_name,
      })
      obj = form.secondName ? ({
        ...obj,
        secondName: form.secondName,
      }) : ({
        ...obj,
        secondName: user.last_name,
      })
      if (user.phoneNumber) {
        obj = form.phone ? ({
          ...obj,
          phone: form.phone,
        }) : ({
          ...obj,
          phone: user.phoneNumber,
        })
      };
      if (user.postal_code) {
        obj = form.index ? ({
          ...obj,
          index: form.index,
        }) : ({
          ...obj,
          index: user.postal_code,
        })
      };
      if (user.region) {
        obj = form.region ? ({
          ...obj,
          region: form.region,
        }) : ({
          ...obj,
          region: user.region,
        })
      };
      if (user.city) {
        obj = form.city ? ({
          ...obj,
          city: form.city,
        }) : ({
          ...obj,
          city: user.city,
        })
      };
      if (user.location) {
        obj = form.address ? ({
          ...obj,
          address: form.address,
        }) : ({
          ...obj,
          address: user.location,
        })
      };
      setForm(obj);
      setFormChange(true);
    }
  }, [auth.loggedIn]);

  useEffect(() => {
    if (form) {
      form.index && setIndex(form.index);
      form.region && setRegion(form.region);
      form.city && setCity(form.city);
      form.address && setAddress(form.address);
      form.secondName && setSecondName(form.secondName);
      form.firstName && setFirstName(form.firstName);
      form.phone && setPhone(form.phone);
      form.email && setEmail(form.email);
      form.comment && setComment(form.comment);
    }
  }, [formChange]);

  return (
    // <div className={`${styles.container}`}>
      <ul className={styles.row}>
        <li className={styles.input}>
          <Input
            onChange={onChangeFirstName}
            name='firstName'
            value={firstName}
            type="text"
            extraClass={styles.input}
            id="firstName"
            placeholder="Введите имя"
            inputRef={inputRef}
            required
            label='*Имя получателя - обязательное поле'
            classLabel={cn(styles.label, styles.required)}
          />
        </li>
        <li className={styles.input}>
          <Input
            onChange={onChangeSecondName}
            name='secondName'
            value={secondName}
            type="text"
            extraClass={styles.input}
            id="secondName"
            placeholder="Введите фамилию"
            inputRef={inputRef}
            required
            label='*Фамилия получателя - обязательное поле'
            classLabel={cn(styles.label, styles.required)}
          />
        </li>
        <li className={styles.input}>
          <Input
            onChange={onChangePhone}
            name='phone'
            value={phone}
            extraClass={styles.input}
            type="tel"
            id="phone"
            // placeholder="+7"
            inputRef={inputRef}
            minLength={12}
            required
            // label='*Телефон - обязательное поле'
            label={textError.phoneNumber ? textError.phoneNumber : '*Телефон - обязательное поле'}
            // classLabel={cn(styles.label, styles.required)}
            classLabel={cn(styles.label, textError.phoneNumber ? styles.error : styles.required)}
          />
        </li>
        <li className={styles.input}>
          <Input
            onChange={onChangeEmail}
            name='email'
            value={email}
            extraClass={styles.input}
            type="email"
            id="email"
            placeholder="email@mail.ru"
            inputRef={inputRef}
            label={textError.email ? textError.email : 'E-mail'}
            classLabel={cn(styles.label, textError.email ? styles.error : '')}
          />
        </li>
        <li className={styles.input}>
          <Input
            onChange={onChangeIndex}
            name='index'
            value={index}
            extraClass={styles.input}
            type="text"
            id="index"
            inputRef={inputRef}
            label='Индекс'
            classLabel={styles.label}
          />
        </li>
        <li className={styles.input}>
          <Input
            onChange={onChangeRegion}
            name='region'
            value={region}
            extraClass={styles.input}
            type="text"
            id="region"
            inputRef={inputRef}
            label='Регион/Область'
            classLabel={styles.label}
          />
        </li>
        <li className={cn(styles.input, styles.city)}>
          <Input
            onChange={onChangeCity}
            name='city'
            value={city}
            extraClass={styles.input}
            type="text"
            id="city"
            inputRef={inputRef}
            label='Город/Насел.пункт'
            classLabel={styles.label}
          />
        </li>
        <li className={cn(styles.input, styles.floor)}>
          <Input
            onChange={onChangeAddress}
            name='address'
            value={address}
            extraClass={styles.input}
            type="text"
            id="address"
            inputRef={inputRef}
            label='Улица/Дом/Квартира'
            classLabel={styles.label}
          />
        </li>
        <li className={cn(styles.input, styles.comment)}>
          <Input
            onChange={onChangeComment}
            name={'comment'}
            value={comment}
            extraClass={styles.input}
            type="text"
            id="comment"
            inputRef={inputRef}
            label='Комментарий'
            classLabel={styles.label}
          />
        </li>
      </ul>
    // </div>
  );
};

export default InputsBox;
