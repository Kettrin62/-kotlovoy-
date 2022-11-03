import * as React from 'react';
import { useState, useRef, useContext, useEffect, useCallback } from 'react';
import api from '../api';
import Button from '../components/button/button';
import Form from '../components/form/form';
import { UserContext } from '../services/contexts/user-context';
import { TUser } from '../services/types/data';
import InputEdit from '../ui/input-edit/input-edit';
import Input from '../ui/input/input';
import { useFormWithValidation } from '../utils/validation';
import profileprofileStyles from './profile-profile.module.css';

export function ProfileProfilePage() {
  const [changValue, setChangeValue] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [id, setId] = useState<number | null>(null);
  const [cancel, setCancel] = useState(false);

  const [username, setUsername] = useState('');
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setChangeValue(true);
  };

  const [firstname, setFirstname] = useState('');
  const onChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
    setChangeValue(true);
  };

  const [lastname, setLastname] = useState('');
  const onChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
    setChangeValue(true);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replace(/\D/g, '').replace(/^7|8/, '+7').slice(0, 12));
    setChangeValue(true);
  };

  const [postalCode, setPostalCode] = useState('');
  const onChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 6));
    setChangeValue(true);
  };

  const [region, setRegion] = useState('');
  const onChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
    setChangeValue(true);
  };

  const [city, setCity] = useState('');
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setChangeValue(true);
  };

  const [location, setLocation] = useState('');
  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setChangeValue(true);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if(user) {
      setId(user.id);
      setUsername(user.username);
      setFirstname(user.first_name);
      setLastname(user.last_name);
      if (user.phoneNumber) {
        setPhoneNumber(user.phoneNumber);
      } else setPhoneNumber('');
      if (user.postal_code) {
        setPostalCode(user.postal_code);
      } else setPostalCode('');
      if (user.region) {
        setRegion(user.region);
      } else setRegion('');
      if (user.city) {
        setCity(user.city);
      } else setCity('');
      if (user.location) {
        setLocation(user.location);
      } else setLocation('');
    }
  }, [user, cancel]);



  const updateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const dataUser = {
        city,
        first_name: firstname,
        last_name: lastname,
        location,
        phoneNumber,
        postal_code: postalCode,
        region,
        username,
      };
      api
        .updateDataUser(id, dataUser)
        .then(res => {
          setUser(res)
        })
        .catch(err => console.log(err))
    }
    setChangeValue(false);
  };

  const onClickCancel = () => {
    setCancel(!cancel);
    setChangeValue(false);
  };

  return (
    <div className={profileprofileStyles.container}>
      <Form name='profile' onSubmit={updateUserSubmit}>
        <InputEdit
          handleChange={onChangeUsername}
          placeholder='Логин'
          label='Логин'
          value={username}
          inputRef={inputRef}
          name='username'
          required={true}
        />
        <InputEdit
          placeholder='Имя'
          label='Имя'
          handleChange={onChangeFirstname}
          value={firstname}
          name='first_name'
          inputRef={inputRef}
        />
        <InputEdit
          placeholder='Фамилия'
          handleChange={onChangeLastname}
          value={lastname}
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
          placeholder='Дисконтаная скидка'
          onChange={() => {}}
          value={`Дисконтаная скидка - ${user?.discount} %`}
          name='discount'
        />
        <InputEdit
          placeholder='Телефон'
          handleChange={onChangePhoneNumber}
          value={phoneNumber}
          name='phoneNumber'
        />
        <InputEdit
          placeholder='Индекс'
          handleChange={onChangePostalCode}
          value={postalCode}
          name='postal_code'
        />
        <InputEdit
          placeholder='Регион/Область'
          handleChange={onChangeRegion}
          value={region}
          name='region'
        />
        <InputEdit
          placeholder='Город/Насел.пункт'
          handleChange={onChangeCity}
          value={city}
          name='city'
        />
        <InputEdit
          placeholder='Улица/Дом/Квартира'
          handleChange={onChangeLocation}
          value={location}
          name='location'
        />
        <div className={profileprofileStyles.buttons}>
          <Button type='submit' disabled={!changValue}>
            Сохранить
          </Button>
          <Button type='button' clickHandler={onClickCancel} disabled={!changValue}>
            Отмена
          </Button>
        </div>
      </Form>
    </div>
  );
}