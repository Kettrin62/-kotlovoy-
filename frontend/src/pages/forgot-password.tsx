import * as React from 'react';
import { useState, useRef, useContext, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import { TUseLocationState } from '../services/types/data';
import AuthContext from '../services/contexts/auth-context';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import cn from 'classnames';

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
  const [isValid, setIsValid] = useState(false);

  const inputRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setEmailValue(value.toLowerCase());
    setIsValid(target?.closest('form')!.checkValidity());
  };

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
        <h2 className={loginStyles.header}>
          Восстановление пароля
        </h2>
        <Form name='forgot-password' onSubmit={forgotPasswordSubmit}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleChange}
            value={emailValue}
            name={'email'}
            inputRef={inputRef}
          />
          <Button 
            type='submit'
            disabled={!isValid}
            className={cn(loginStyles.button, loginStyles.save)}
          >
            Восстановить
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