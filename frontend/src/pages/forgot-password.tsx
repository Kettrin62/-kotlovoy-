import * as React from 'react';
import { useState, useRef, useContext, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import { TUseLocationState } from '../services/types/data';
import AuthContext from '../services/contexts/auth-context';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import api from '../api';

interface IForgotPasswordProps {
  onForgot: (email: string) => void;
  success: boolean;
}


export const ForgotPasswordPage: FC<IForgotPasswordProps> = ({ 
  onForgot,
  success
}) => {
  const { loggedIn } = useContext(AuthContext);
  const { state } = useLocation<TUseLocationState>();

  const [emailValue, setEmailValue] = useState('');

  const inputRef = useRef(null);

  const forgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue) {
      onForgot(emailValue);
    }
  };

  if (success) {
    return (
      <Redirect to={{ pathname: '/reset-password' }} />
    )
  };

  if (loggedIn) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Восстановление пароля
        </h2>
        <Form name='forgot-password' class={'mt-6 '} onSubmit={forgotPasswordSubmit}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'email'}
            // error={false}
            inputRef={inputRef}
            // errorText={'Ошибка'}
          />
          <Button type='submit'>
            Восстановить
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