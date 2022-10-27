import * as React from 'react';
import { FC, useContext, useState, useEffect } from 'react';
import Form from '../components/form/form';
import { Link,  Redirect } from 'react-router-dom';
import loginStyles from './login.module.css';
import { TFormAuth, TTypeInput } from '../services/types/data';
import Input from '../ui/input/input';
import Button from '../components/button/button';
import { useFormWithValidation } from '../utils/validation';
import AuthContext from '../services/contexts/auth-context';
import InputBox from '../components/input-box/input-box';
import visibleIcon from '../images/visible.svg';
import invisibleIcon from '../images/invisible.svg';
import InputPassword from '../ui/input-password/input-password';

interface ILoginPageProps {
  onLogin: (data: TFormAuth) => void;
}

export const LoginPage: FC<ILoginPageProps> = ({ 
  onLogin
}) => {
  const authContext = useContext(AuthContext);
  const { values, handleChange, isValid } = useFormWithValidation();
  // const [visible, setVisible] = useState(false);

  console.log(values);
  

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onLogin(values)
  };

  if (authContext) {
    return (
      <Redirect to='/' />
    )
  };

  // const onClickVisible = () => {
  //   setVisible(!visible);
  // };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
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
          {/* <div className={loginStyles.input}>
            <Input
              type={visible ? 'text' : 'password'}
              placeholder='Пароль'
              onChange={handleChange}
              name='password'
              required
            />
            <Button className={loginStyles.icon} clickHandler={onClickVisible}>
              <img src={visible ? invisibleIcon : visibleIcon} alt='Иконка глаза' />
            </Button>
          </div> */}
          <InputPassword handleChange={handleChange} />
          <Button 
            type='submit'
            disabled={!isValid}
          >
            Войти
          </Button>
        </Form>
        <div className={loginStyles.item}>
          <p>
            Вы — новый пользователь?
          </p>
          <Link className={loginStyles.link} to='/register'>
            Зарегистрироваться
          </Link>
        </div>
        <div className={loginStyles.item}>
          <p>
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
