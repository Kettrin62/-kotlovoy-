import React, { useState, useRef, useContext, useEffect } from 'react';
import styles from './inputs-box.module.css';
import Input from '../../ui/input/input';
import { DeliveryFormContext } from '../../services/contexts/cart-context';
import { UserContext } from '../../services/contexts/user-context';
import { TDeliveryForm } from '../../services/types/data';
import validator from 'validator';

export const InputsBox = () => {
  const { form, setForm } = useContext(DeliveryFormContext);
  const { user } = useContext(UserContext);
  const [formChange, setFormChange] = useState(false);
  const [textError, setTextError] = useState('');

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
  const [phone, setPhone] = useState('');
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').replace(/^7|8/, '+7').slice(0, 12));
    obj = form;
    obj = ({
      ...obj,
      phone: e.target.value,
    });
    setForm(obj);
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
      setTextError('Введите правильный адрес электронной почты')
    } else setTextError('');
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
  }, []);

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
    <div className={`${styles.container}`}>
      <ul className={styles.row}>
        <li className={`${styles.input} ${styles.inputFlex}`}>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="index">
              Индекс
            </label>
            <Input
              onChange={onChangeIndex}
              name='index'
              value={index}
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
              name='region'
              value={region}
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
              name='city'
              value={city}
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
            name='address'
            value={address}
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
            name='secondName'
            value={secondName}
            type="text"
            extraClass={styles.input}
            id="secondName"
            placeholder="Введите фамилию"
            inputRef={inputRef}
            required
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="firstName">
            Имя получателя
          </label>
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
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="phone">
            Телефон
          </label>
          <Input
            onChange={onChangePhone}
            name='phone'
            value={phone}
            extraClass={styles.input}
            type="tel"
            id="phone"
            placeholder="+7"
            inputRef={inputRef}
            required
          />
        </li>
        <li className={styles.input}>
          <label className={styles.label} htmlFor="email">
            {textError ? textError : 'E-mail'}
          </label>
          <Input
            onChange={onChangeEmail}
            name='email'
            value={email}
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
            value={comment}
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
