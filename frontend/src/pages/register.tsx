import * as React from 'react';
import { FC, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import { TFormRegister } from '../services/types/data';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import { useFormWithValidation } from '../utils/validation';
import AuthContext from '../services/contexts/auth-context';
import InputPassword from '../ui/input-password/input-password';

interface IRegisterPageProps {
  onSignUp: (data: TFormRegister) => void;
}

export const RegisterPage: FC<IRegisterPageProps> = ({ 
  onSignUp 
}) => {
  const { values, handleChange, isValid } = useFormWithValidation();
  const authContext = useContext(AuthContext);

  const registerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(values);
  };

  if (authContext) {
    return (
      <Redirect to='/' />
    )
  };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2>
          Регистрация
        </h2>
        <Form name='register' onSubmit={registerSubmit}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            name={'email'}
            required
          />
          <Input
            type={'text'}
            placeholder={'Имя пользователя'}
            onChange={handleChange}
            name={'username'}
            required
          />
          {/* <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleChange}
            name={'password'}
            required
          /> */}
          <InputPassword handleChange={handleChange} />
          <Button 
            type='submit'
            disabled={!isValid}
          >
            Зарегистрироваться
          </Button>
        </Form>
        <div className={loginStyles.item}>
          <p>
            Уже зарегистрированы?
          </p>
          <Link className={loginStyles.link} to='/login'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}