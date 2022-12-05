import { FC } from 'react';
import { TFormStatus } from '../../services/types/data';
import Input from '../../ui/input/input';
import Button from '../button/button';
import Form from '../form/form';
import styles from './form-status.module.css';

interface IFormStatusProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: TFormStatus;
  isValid: boolean;
  onCancel: () => void;
}

const FormStatus: FC<IFormStatusProps> = ({
  onSubmit,
  onChange,
  values,
  isValid,
  onCancel
}) => (
  <Form name='status' onSubmit={onSubmit} class={styles.form}>
    <Input
      type='text'
      name='status'
      onChange={onChange}
      label='Наименование статуса'
      required
      placeholder='Наименование статуса'
      value={values.status}
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


export default FormStatus