import { useState, useRef } from 'react';
import Button from '../components/button/button';
import Form from '../components/form/form';
import Title from '../components/title/title';
import Input from '../ui/input/input';
import styles from './feedback.module.css';
import buttonStyles from './login.module.css';
import cn from 'classnames';
import { useFormFeedback } from '../utils/validation';
import { TFeedback } from '../services/types/data';
import api from '../api';
import Modal from '../components/modal/modal';

export function FeedbackPage() {

  const { values, handleChange, errors, isValid, resetForm } = useFormFeedback();
  const [visible, setVisible] = useState(false);

  const inputRef = useRef(null);

  const sendMessage = (values: TFeedback) => {
    api
      .postFeedback(values)
      .then(res => {
        console.log('ok');
        setVisible(true);
        
      })
      .catch(err => {
        console.log('lll');
        
        const errors = Object.values(err)
        if (errors.length > 0) {
          alert(errors.join(', '))
        }
      })
  }

  const handleCloseModal = () => {
    setVisible(false);
    resetForm();
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(values)

  };

  const modal = (
    <Modal header='Обратная связь' onClose={handleCloseModal}>
      <p>Сообщение отправлено</p>
    </Modal>
  )

  console.log(visible);
  
  

  return (
    <div className={styles.container}>
      <Title text='Написать нам' />
      <Form name='Обратная связь' onSubmit={handleSumbit}>
        <Input 
          type='text' 
          name='name'
          id='name'
          placeholder='Фамилия/Имя'
          label='*обязательное поле'
          extraClass={styles.input}
          classLabel={styles.label}
          onChange={handleChange}
          value={values.name}
          inputRef={inputRef}
        />
        <Input
          type='text' 
          name='feedback'
          id='feedback'
          placeholder='Телефон или E-mail'
          label='*обязательное поле'
          extraClass={styles.input}
          classLabel={styles.label}
          onChange={handleChange}
          value={values.feedback}
          inputRef={inputRef}
        />
        <label className={styles.label}>
          *обязательное поле
          <textarea 
            name='text'
            id='text'
            placeholder='Сообщение' 
            className={styles.message}
            onChange={handleChange}
            value={values.text}
          >
          </textarea>
        </label>
        <Button 
            type='submit'
            disabled={!isValid}
            className={cn(buttonStyles.button, buttonStyles.save)}
          >
            Отправить
          </Button>
      </Form>
      {visible && modal}
    </div>
  )
}
