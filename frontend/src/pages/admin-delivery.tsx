import { FC, useContext, useState } from 'react';
import Button from '../components/button/button';
import Form from '../components/form/form';
import { priceFormat } from '../components/total-price/utils';
import { DeliveryContext } from '../services/contexts/app-context';
import { useFormDelivery } from '../utils/validation';
import Input from '../ui/input/input';
import styles from './status.module.css';
import api from '../api';
import { TDelivery } from '../services/types/data';

interface IAdminDeliveryPageProps {
  addDelivery: (data: TDelivery, set: (el: boolean) => void) => void;
}

export const AdminDeliveryPage: FC<IAdminDeliveryPageProps> = ({ addDelivery }) => {
  const deliveryMethods = useContext(DeliveryContext);
  const [visible, setVisible] = useState(false);
  const { values, handleChange, isValid, resetForm } = useFormDelivery();

  const onAddDelivery = () => {
    setVisible(true)
  }

  const addSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryMethods.some(item => item.company === values.company)) {
      addDelivery(values, setVisible)
    } else alert('Такой метод доставки уже существует')
    resetForm();
  };

  const cancel = () => {
    resetForm();
    setVisible(false);
  }

  return (
    <div>
      <ul>
        {[...deliveryMethods].map(item => (
          <li key={item.id}>
            <h4>{item.company}</h4>
            <p>{item.duration}</p>
            <p>{priceFormat(item.price)}</p>
            <p>{item.comment}</p>
          </li>
        ))}
      </ul>
      {!visible && (
        <Button className={styles.button} clickHandler={onAddDelivery}>
          Добавить метод доставки
        </Button>
      )}
      {visible && (
        <Form name='delivery' onSubmit={addSubmit}>
          <Input
            type='text'
            name='company'
            onChange={handleChange}
            label='Наименование компании'
            required
            placeholder='Наименование компании'
            value={values.company}
          />
          <Input
            type='text'
            name='duration'
            onChange={handleChange}
            label='Срок доставки'
            placeholder='Срок доставки'
            value={values.duration}
            required
          />
          <Input
            type='text'
            name='price'
            onChange={handleChange}
            label='Стоимость доставки'
            placeholder='Стоимость доставки'
            value={values.price !== 0 ? String(values.price) : ''}
            required
          />
          <Input
            type='text'
            name='comment'
            onChange={handleChange}
            label='Комментарий'
            placeholder='Комментарий'
            value={values.comment}
          />
          <div className={styles.box}>
            <Button type='submit' className={styles.button} disabled={!isValid}>
              Сохранить
            </Button>
            <Button 
              type='button' 
              className={styles.button} 
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