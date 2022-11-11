import { FC, useCallback, useEffect, useState } from 'react';
import { TFormStatus, TStatus, TUser } from '../../services/types/data';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import EditButton from '../../ui/edit-button/edit-button';
import { statusesImmutable } from '../../utils/data';
import userStyles from './user.module.css';
import Modal from '../../components/modal/modal';
import FormStatus from '../form-status/form-status';
import Form from '../form/form';
import Input from '../../ui/input/input';
import Button from '../button/button';
import modalStyles from '../form-status/form-status.module.css';

interface IUserProps {
  user: TUser;
  changeDiscount: (id: number, data: {
    discount: number
  }) => void;
  // deleteStatus: (id: number) => void;
}

const User: FC<IUserProps> = ({ user, changeDiscount }) => {
  const { id, username, last_name, first_name, email, discount, phoneNumber } = user
  const [visible, setVisible] = useState(false);


  // const isLock = statusesImmutable.some(item => item === id);

  interface IValues {
    discount: number
  }

  const [values, setValues] = useState<IValues>({
    discount
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target?.closest("form")!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {
      discount
    }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  useEffect(() => {
    setValues({
      discount
    })
  }, [discount])

  const editSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeDiscount(id, values)
    setVisible(false)
    resetForm();
  }

  const handleCloseModal = () => {
    resetForm();
    setVisible(false);
  }

  const cancel = () => {
    resetForm();
    setVisible(false);
  }

  const modal = (
    <Modal header='Изменить дисконтную скидку' onClose={handleCloseModal}>
      <Form name='discount' onSubmit={editSubmit} class={modalStyles.form}>
        <Input
          type='text'
          name='discount'
          onChange={handleChange}
          label='Дисконтная скидка'
          required
          placeholder='Дисконтная скидка'
          value={String(values.discount)}
          extraClass={modalStyles.input}
          classLabel={modalStyles.label}
        />
        <div className={userStyles.box}>
          <Button type='submit' className={modalStyles.button} disabled={!isValid}>
            Сохранить
          </Button>
          <Button 
            type='button' 
            disabled={!isValid}
            clickHandler={cancel}
            className={modalStyles.button}
          >
            Отменить
          </Button>
        </div>
      </Form>
    </Modal>
  )

  return (
    <li key={id} className={userStyles.item}>
      <h4 className={userStyles.header}>{username}</h4>
      {(first_name || last_name) && <p className={userStyles.text}>{`${first_name} ${last_name}`}</p>}
      <p className={userStyles.text}>{email}</p>
      {phoneNumber && <p className={userStyles.text}>{phoneNumber}</p>}
      <div className={userStyles.discount}>
        <p className={userStyles.text}>{`Дисконтная скидка ${discount}%`}</p>
        <EditButton onEdit={()=> setVisible(true)} extraClass={userStyles.button} />
      </div>
      {visible && modal}
    </li>
  )
}

export default User