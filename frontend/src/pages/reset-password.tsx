import * as React from 'react';
import { useState, useRef, useContext, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import { TUseLocationState } from '../services/types/data';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import AuthContext from '../services/contexts/auth-context';
import api from '../api';

interface IResetPasswordPageProps {
  successForgot: boolean;
}

export const ResetPasswordPage: FC<IResetPasswordPageProps> = ({
  successForgot
}) => {
  const authContext = useContext(AuthContext);
  const { state } = useLocation<TUseLocationState>();
  const [success, setSuccess] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');
  const onChangePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const [codeValue, setCodeValue] = React.useState("");
  const onChangeCodeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(e.target.value);
  };

  const inputRef = useRef(null);

  const resetPassword = (password: string, token: string) => {
    api
      .resetPassword(password, token)
      .then(res => {
        setSuccess(true);
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
        setSuccess(false);
      })
  }

  const resetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordValue && codeValue) {
      resetPassword(passwordValue, codeValue);
    }
  };

  if (!successForgot) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
    )
  };

  if (authContext) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  };

  if (success) {
    return (
      <Redirect to={ '/profile' } />
    )
  };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Восстановление пароля
        </h2>
        <Form name='reset-password' class={'mt-6 '} onSubmit={resetPasswordSubmit}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={onChangePasswordValue}
            value={passwordValue}
            name={'email'}
            inputRef={inputRef}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChangeCodeValue}
            value={codeValue}
            name={'code'}
            inputRef={inputRef}
          />
          <Button type='submit'>
            Сохранить
          </Button>
        </Form>
        <div className={'mt-20 ' + loginStyles.item}>
          <p className='text text_type_main-default'>
            Вспомнили пароль?
          </p>
          <Link className={'text text_type_main-default ' + loginStyles.link} to='/login'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}