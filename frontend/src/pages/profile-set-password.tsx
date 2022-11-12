import * as React from 'react';
import { useState } from 'react';
import Form from '../components/form/form';
import loginStyles from './login.module.css';
import Button from '../components/button/button';
import { useFormWithValidation } from '../utils/validation';
import InputPassword from '../ui/input-password/input-password';
import styles from './profile-profile.module.css';
import api from '../api';
import cn from 'classnames';
import Modal from '../components/modal/modal';
import modalStyles from './order-info.module.css';
import { Loader } from '../ui/loader/loader';

export function ProfileSetPasswordPage() {
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [ changRequest, setChangeRequest] = useState(false);


  const onChangePassword = (data: {
    current_password: string;
    new_password: string;
  }) => {
    const { current_password, new_password } = data;
    setChangeRequest(true);
    api
      .changePassword({ current_password, new_password })
      .then(res => {
        setText('Пароль изменён');
        setVisible(true);
        setChangeRequest(false)
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          setText(errors.join(', '));
          setVisible(true);
          // alert(errors.join(', '))
        }
        setChangeRequest(false)
      })
  }

  const changeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangePassword(values)
  };

  const onClickCancel = () => {
    resetForm();
  };

  const handleCloseModal = () => {
    setVisible(false);
    setText('');
    resetForm();
  };


  const modal = (
    <Modal header='Смена пароля' onClose={handleCloseModal}>
      <p className={modalStyles.modaltext}>{text}</p>
    </Modal>
  )

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className={loginStyles.header}>
          Сменить пароль
        </h2>
        <Form name='set-password' onSubmit={changeSubmit}>
          <InputPassword 
            handleChange={handleChange} 
            name='current_password'
            value={values.current_password}
            placeholder='Текущий пароль'
            // className={styles.input}
          />
          <InputPassword 
            handleChange={handleChange} 
            name='new_password'
            value={values.new_password}
            placeholder='Новый пароль'
            // className={styles.input}
          />
          <div className={styles.buttons}>
            <Button 
              type='submit'
              disabled={!isValid}
              className={cn(styles.button, styles.save)}
            >
              {changRequest ? <Loader size='small' /> : 'Сменить'}
            </Button>
            <Button 
              type='button' 
              clickHandler={onClickCancel}
              disabled={!isValid}
              className={cn(styles.button, styles.cancel)}
            >
              Отмена
            </Button>
          </div>
        </Form>
      </div>
      {visible && modal}
    </section>
  );
}
