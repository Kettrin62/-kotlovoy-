import { FC, useCallback, useEffect, useState } from 'react';
import { TDelivery, TDeliveryMethod } from '../../services/types/data';
import FormDelivery from '../form-delivery/form-delivery';
import Modal from '../modal/modal';
import { priceFormat } from '../total-price/utils';
import styles from '../status-item/status-item.module.css';
import EditButton from '../../ui/edit-button/edit-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';

interface IAdminDeliveryItemProps {
  element: TDeliveryMethod;
  ediMethod: (id: number, data: TDelivery) => void;
  deleteMethod: (id: number) => void;
}

const AdminDeliveryItem: FC<IAdminDeliveryItemProps> = ({ element, ediMethod, deleteMethod }) => {
  const [visible, setVisible] = useState(false);
  const { id, company, duration, price, comment } = element;

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

  return (
    <li className={styles.container}>
      <div>
        <h4>{company}</h4>
        <p>{duration}</p>
        <p>{priceFormat(price)}</p>
        <p>{comment}</p>
      </div>
      <EditButton onEdit={()=> setVisible(true)} extraClass={styles.button} />
      <DeleteButton onDelete={onDeleteMethod} extraClass={styles.button} />
      {visible && modal}
    </li>
  )
}

export default AdminDeliveryItem