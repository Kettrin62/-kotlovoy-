import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { TDelivery, TFormStatus } from '../../services/types/data';
import Input from '../../ui/input/input';
import Button from '../button/button';
import Form from '../form/form';
import styles from '../form-status/form-status.module.css';

interface IFormDeliveryProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: TDelivery;
  isValid: boolean;
  onCancel: () => void;
}

const FormDelivery: FC<IFormDeliveryProps> = ({
  onSubmit,
  onChange,
  values,
  isValid,
  onCancel
}) => {

  return (
    <Form name='delivery' onSubmit={onSubmit} class={styles.form}>
      <Input
        type='text'
        name='company'
        onChange={onChange}
        label='Наименование метода доставки'
        required
        placeholder='Наименование метода доставки'
        value={values.company}
        extraClass={styles.input}
        classLabel={styles.label}
      />
      <Input
        type='text'
        name='duration'
        onChange={onChange}
        label='Срок доставки'
        required
        placeholder='Срок доставки'
        value={values.duration}
        extraClass={styles.input}
        classLabel={styles.label}
      />
      <Input
        type='text'
        name='price'
        onChange={onChange}
        label='Стоимость доставки'
        required
        placeholder='Стоимость доставки'
        value={values.price !== 0 ? String(values.price) : ''}
        extraClass={styles.input}
        classLabel={styles.label}
      />
      <Input
        type='text'
        name='comment'
        onChange={onChange}
        label='Комментарий'
        placeholder='Комментарий'
        value={values.comment}
        extraClass={styles.input}
        classLabel={styles.label}
      />
      <div className={styles.box}>
        <Button type='submit' className={styles.button} disabled={!isValid}>
          Сохранить
        </Button>
        <Button 
          type='button' 
          className={styles.button} 
          disabled={!isValid}
          clickHandler={onCancel}
        >
          Отменить
        </Button>
      </div>
    </Form>
  )
} 

export default FormDelivery