import { FC, useCallback, useEffect, useState } from 'react';
import { TDelivery, TDeliveryMethod } from '../../services/types/data';
import FormDelivery from '../form-delivery/form-delivery';
import Modal from '../modal/modal';
import { priceFormat } from '../total-price/utils';
import styles from '../status-item/status-item.module.css';
import EditButton from '../../ui/edit-button/edit-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import Button from '../button/button';

interface IAdminDeliveryItemProps {
  element: TDeliveryMethod;
  ediMethod: (id: number, data: TDelivery) => void;
  deleteMethod: (id: number) => void;
}

const AdminDeliveryItem: FC<IAdminDeliveryItemProps> = ({ element, ediMethod, deleteMethod }) => {
  const [visible, setVisible] = useState(false);
  const { id, company, duration, price, comment } = element;
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState<TDelivery>({
    company,
    duration,
    price,
    comment
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
      company,
      duration,
      price,
      comment
    }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  useEffect(() => {
    setValues({
      company,
      duration,
      price,
      comment
    })
  }, [company, duration, price, comment]);

  const editSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ediMethod(id, values)
    setVisible(false)
    resetForm();
  };

  const onDeleteMethod = () => {
    deleteMethod(id)
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
    <Modal header='Редактировать метод доставки' onClose={handleCloseModal}>
      <FormDelivery
        onSubmit={editSubmit}
        onChange={handleChange}
        values={values}
        isValid={isValid}
        onCancel={cancel}
      />
    </Modal>
  )

  const modalConfirm = (
    <Modal header='' onClose={handleCloseModal}>
      <div className={styles.box}>
        <p className={styles.text}>
        Доставка в заказах будет также удалена.
        </p>
        <p className={styles.text}>
          Всё равно удалить?
        </p>
        <div className={styles.row}>
          <Button clickHandler={onDeleteMethod} className={styles.buttonModal}>Удалить</Button>
          <Button clickHandler={()=> setConfirm(false)} className={styles.buttonModal}>Отменить</Button>
        </div>
      </div>
    </Modal>
  )

  return (
    <li className={styles.container}>
      <div className={styles.content}>
        <h4 className={styles.title}>{company}</h4>
        <div className={styles.description}>
          <p className={styles.comment}>{duration}</p>
          <p className={styles.comment}>{priceFormat(price)}</p>
          <p className={styles.comment}>{comment}</p>
        </div>
      </div>
      <EditButton onEdit={()=> setVisible(true)} extraClass={styles.button} />
      <DeleteButton onDelete={()=> setConfirm(true)} extraClass={styles.button} />
      {confirm && modalConfirm}
      {visible && modal}
    </li>
  )
}

export default AdminDeliveryItem