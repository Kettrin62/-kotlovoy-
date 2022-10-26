import * as React from 'react';
import { useState, useRef, useContext, useEffect, useCallback } from 'react';
import api from '../api';
import Button from '../components/button/button';
// import {
//   Input,
//   Button
// } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import { UserContext } from '../services/contexts/user-context';
import Input from '../ui/input/input';
import { useFormWithValidation } from '../utils/validation';
// import { useDispatch, useSelector } from '../services/hooks';
// import { getCookie } from '../utils/functions';
import profileprofileStyles from './profile-profile.module.css';
// import { 
//   updateUserDataToken,
//   updateUserData
// } from '../services/actions/user';

export function ProfileProfilePage() {
  // const { name, email, token } = useSelector(state => state.user);
  const [changValue, setChangeValue] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [cancel, setCancel] = useState(false);

  const [values, setValues] = useState({
    id: 0,
    city: '',
    discount: 0,
    email: '',
    first_name: '',
    last_name: '',
    location: '',
    phoneNumber: '',
    postal_code: '',
    region: '',
    username: '',
  });

  const inputRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value    
    });
    setChangeValue(true);
  }

  console.log(user);
  

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        id: user.id,
        discount: user.discount,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      })
      if (user.city) {
        setValues({
          ...values,
          city: user.city
        })
      }
      if (user.location) {
        setValues({
          ...values,
          location: user.location
        })
      }
      if (user.phoneNumber) {
        setValues({
          ...values,
          phoneNumber: user.phoneNumber
        })
      }
      if (user.postal_code) {
        setValues({
          ...values,
          postal_code: user.postal_code
        })
      }
      if (user.region) {
        setValues({
          ...values,
          region: user.region
        })
      }
    }
  }, [user, cancel]);

  const updateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { 
      id,
      city, 
      discount, 
      email, 
      first_name, 
      last_name, 
      location,
      phoneNumber,
      postal_code,
      region,
      username,
    } = values;
    const dataUser = {
      id,
      city,
      discount,
      email,
      first_name,
      last_name,
      location,
      phoneNumber,
      postal_code,
      region,
      username,
    };
    if (id !== 0) {
      console.log(dataUser);
      
      api
        .updateDataUser(dataUser)
        .then(res => setUser(res))
        .catch(err => console.log(err))
    }
    // if (!token) {
    //   const refreshToken = getCookie('refreshToken');
    //   dispatch(updateUserDataToken(refreshToken, dataUser));    
    // } else {
    //   dispatch(updateUserData(token, dataUser));
    // }
    setChangeValue(false);
    // setPasswordValue('');
  };

  const onClickCancel = () => {
    setCancel(!cancel);
    setChangeValue(false);
  };

  return (
    <div className={profileprofileStyles.container}>
      <Form name='profile' onSubmit={updateUserSubmit}>
        <Input
          type='text'
          placeholder='Логин'
          label='Логин'
          onChange={handleInputChange}
          value={values.username}
          inputRef={inputRef}
          name='username'
        />
        <Input
          type='text'
          placeholder='Имя'
          label='Имя'
          onChange={handleInputChange}
          value={values.first_name}
          name='first_name'
          inputRef={inputRef}
        />
        <Input
          type='text'
          placeholder='Фамилия'
          onChange={handleInputChange}
          value={values.last_name}
          name='last_name'
        />
        <Input
          type='text'
          placeholder='E-mail'
          onChange={() => {}}
          value={user?.email}
          name='email'
        />

        <Input
          type='text'
          placeholder='Телефон'
          onChange={handleInputChange}
          value={values.phoneNumber}
          name='phoneNumber'
        />
        <Input
          type='text'
          placeholder='Индекс'
          onChange={handleInputChange}
          value={values.postal_code}
          name='postal_code'
        />
        <Input
          type='text'
          placeholder='Регион/Область'
          onChange={handleInputChange}
          value={values.region}
          name='region'
        />
        <Input
          type='text'
          placeholder='Город/Насел.пункт'
          onChange={handleInputChange}
          value={values.city}
          name='city'
        />
        <Input
          type='text'
          placeholder='Улица/Дом/Квартира'
          onChange={handleInputChange}
          value={values.location}
          name='location'
        />
        {
          changValue && 
          <div className={profileprofileStyles.buttons}>
            <Button type='submit'>
              Сохранить
            </Button>
            <Button type='button' clickHandler={onClickCancel}>
              Отмена
            </Button>
          </div>
        }
      </Form>
    </div>
  );
}