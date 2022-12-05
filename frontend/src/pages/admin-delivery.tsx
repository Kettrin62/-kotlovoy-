import { FC, useContext, useState } from 'react';
import Button from '../components/button/button';
import { DeliveryContext } from '../services/contexts/app-context';
import { useFormDelivery } from '../utils/validation';
import styles from './status.module.css';
import { TDelivery } from '../services/types/data';
import Modal from '../components/modal/modal';
import FormDelivery from '../components/form-delivery/form-delivery';
import AdminDeliveryItem from '../components/admin-delivery-item/admin-delivery-item';

interface IAdminDeliveryPageProps {
  addDelivery: (data: TDelivery, set: (el: boolean) => void) => void;
  editDelivery: (id: number, data: TDelivery) => void;
  deleteDelivery: (id: number) => void;
}

export const AdminDeliveryPage: FC<IAdminDeliveryPageProps> = ({ 
  addDelivery,
  editDelivery,
  deleteDelivery
}) => {
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

  const handleCloseModal = () => {
    resetForm();
    setVisible(false);
  }

  const modal = (
    <Modal header='Добавить метод доставки' onClose={handleCloseModal}>
      <FormDelivery
        onSubmit={addSubmit}
        onChange={handleChange}
        values={values}
        isValid={isValid}
        onCancel={cancel}
      />
    </Modal>
  )

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {[...deliveryMethods].map(item => (
          <AdminDeliveryItem
            key={item.id}
            ediMethod={editDelivery}
            deleteMethod={deleteDelivery}
            element={item}
          />
        ))}
      </ul>
      {!visible && (
        <Button className={styles.button} clickHandler={onAddDelivery}>
          Добавить метод доставки
        </Button>
      )}
      {visible && modal}
    </div>
  )
}