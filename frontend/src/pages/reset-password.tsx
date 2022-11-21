import * as React from 'react';
import { useState, useRef, useContext, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import { TUseLocationState } from '../services/types/data';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import { AuthContext } from '../services/contexts/auth-context';
import api from '../api';
import InputPassword from '../ui/input-password/input-password';
import { useFormWithValidation } from '../utils/validation';
import cn from 'classnames';

interface IResetPasswordPageProps {
  successForgot: boolean;
}

export const ResetPasswordPage: FC<IResetPasswordPageProps> = ({
  successForgot
}) => {
  const { auth } = useContext(AuthContext);
  const { state } = useLocation<TUseLocationState>();
  const [success, setSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');
  const onChangePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    setPasswordValue(value);
    setIsValid(target?.closest('form')!.checkValidity());
  };

  const [codeValue, setCodeValue] = React.useState("");
  const onChangeCodeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    setCodeValue(e.target.value);
    setIsValid(target?.closest('form')!.checkValidity());
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

  if (auth.loggedIn) {
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
        <h2 className={loginStyles.header}>
          Восстановление пароля
        </h2>
        <Form name='reset-password' onSubmit={resetPasswordSubmit}>
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={onChangeCodeValue}
            value={codeValue}
            name='code'
            inputRef={inputRef}
            required
          />
          <InputPassword 
            placeholder='Введите новый пароль'
            handleChange={onChangePasswordValue} 
          />
          <Button
            type='submit'
            disabled={!isValid}
            className={cn(loginStyles.button, loginStyles.save)}
          >
            Сохранить
          </Button>
        </Form>
        <div className={loginStyles.item}>
          <p className={loginStyles.text}>
            Вспомнили пароль?
          </p>
          <Link className={loginStyles.link} to='/login'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}