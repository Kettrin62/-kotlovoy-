import { FC, useState } from 'react';
import Button from '../components/button/button';
import Form from '../components/form/form';
import Input from '../ui/input/input';
import { TFormStatus, TStatus } from '../services/types/data';
import statusStyles from './status.module.css';
import { useFormStatus, useFormWithValidation } from '../utils/validation';
import api from '../api';

interface IStatusPageProps {
  statuses: Array<TStatus>;
  createStatus: (data: TFormStatus, set: (el: boolean) => void) => void;
}

export const StatusPage: FC<IStatusPageProps> = ({ statuses, createStatus }) => {
  const [visible, setVisible] = useState(false);
  const { values, handleChange, isValid, resetForm } = useFormStatus();

  const onCreateStatus = () => {
    setVisible(true)
  };

  const createSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statuses.some(item => item.status === values.status)) {
      createStatus(values, setVisible)
    } else alert('Такой статус уже существует')
    resetForm();
  };

  const cancel = () => {
    resetForm();
    setVisible(false);
  }

  return (
    <div>
      <ul>
        {[...statuses].map(item => (
          <li key={item.id}>
            <h4>{item.status}</h4>
            <p>{item.comment}</p>
          </li>
        ))}
      </ul>
      {!visible && (
        <Button className={statusStyles.button} clickHandler={onCreateStatus}>
          Создать статус
        </Button>
      )}
      {visible && (
        <Form name='status' onSubmit={createSubmit}>
          <Input
            type='text'
            name='status'
            onChange={handleChange}
            label='Наименование статуса'
            required
            placeholder='Наименование статуса'
            value={values.status}
          />
          <Input
            type='text'
            name='comment'
            onChange={handleChange}
            label='Комментарий'
            placeholder='Комментарий'
            value={values.comment}
          />
          <div className={statusStyles.box}>
            <Button type='submit' className={statusStyles.button} disabled={!isValid}>
              Сохранить
            </Button>
            <Button 
              type='button' 
              className={statusStyles.button} 
              disabled={!isValid}
              clickHandler={cancel}
            >
              Отменить
            </Button>
          </div>
        </Form>
      )}
    </div>
  )
}