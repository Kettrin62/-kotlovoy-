import * as React from 'react';
import { FC, useContext } from 'react';
import Form from '../components/form/form';
import { Link,  Redirect } from 'react-router-dom';
import loginStyles from './login.module.css';
import { TFormAuth } from '../services/types/data';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import { useFormWithValidation } from '../utils/validation';
import AuthContext from '../services/contexts/auth-context';
import InputPassword from '../ui/input-password/input-password';
import cn from 'classnames';

interface ILoginPageProps {
  onLogin: (data: TFormAuth) => void;
}

export const LoginPage: FC<ILoginPageProps> = ({ 
  onLogin
}) => {
  const { loggedIn } = useContext(AuthContext);
  const { values, handleChange, isValid } = useFormWithValidation();

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(values)
  };

  if (loggedIn) {
    return (
      <Redirect to='/' />
    )
  };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className={loginStyles.header}>
          Вход
        </h2>
        <Form name='login' onSubmit={loginSubmit}>
          <Input
            type='email'
            placeholder='E-mail'
            onChange={handleChange}
            name='email'
            required
          />
          <InputPassword handleChange={handleChange} />
          <Button 
            type='submit'
            disabled={!isValid}
            className={cn(loginStyles.button, loginStyles.save)}
          >
            Войти
          </Button>
        </Form>
        <div className={cn(loginStyles.item, loginStyles.column)}>
          <p className={loginStyles.text}>
            Вы — новый пользователь?
          </p>
          <Link className={loginStyles.link} to='/register'>
            Зарегистрироваться
          </Link>
        </div>
        <div className={cn(loginStyles.item, loginStyles.column)}>
          <p className={loginStyles.text}>
            Забыли пароль?
          </p>
          <Link className={loginStyles.link} to='/forgot-password'>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
}
