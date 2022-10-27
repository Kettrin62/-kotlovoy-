import * as React from 'react';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import Button from '../components/button/button';
import { useFormWithValidation } from '../utils/validation';
import InputPassword from '../ui/input-password/input-password';
import styles from './profile-profile.module.css';
import api from '../api';

export function ProfileSetPasswordPage() {
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();

  const onChangePassword = (data: {
    current_password: string;
    new_password: string;
  }) => {
    const { current_password, new_password } = data;
    api
      .changePassword({ current_password, new_password })
      .then(res => {})
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  const changeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangePassword(values)
  };

  const onClickCancel = () => {
    resetForm();
  };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Сменить пароль
        </h2>
        <Form name='set-password' onSubmit={changeSubmit}>
          <InputPassword 
            handleChange={handleChange} 
            name='current_password'
            value={values.current_password}
          />
          <InputPassword 
            handleChange={handleChange} 
            name='new_password'
            value={values.new_password}
          />
          <div className={styles.buttons}>
            <Button 
              type='submit'
              disabled={!isValid}
            >
              Сменить
            </Button>
            <Button 
              type='button' 
              clickHandler={onClickCancel}
              disabled={!isValid}
            >
              Отмена
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
