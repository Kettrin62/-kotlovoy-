import { FC, useState } from 'react';
import Button from '../components/button/button';
import { TFormStatus, TStatus } from '../services/types/data';
import statusStyles from './status.module.css';
import { useFormStatus } from '../utils/validation';
import StatusItem from '../components/status-item/status-item';
import Modal from '../components/modal/modal';
import FormStatus from '../components/form-status/form-status';


interface IStatusPageProps {
  statuses: Array<TStatus>;
  createStatus: (data: TFormStatus, set: (el: boolean) => void) => void;
  editStatus: (id: number, data: TFormStatus) => void;
  deleteStatus: (id: number) => void;
}

export const StatusPage: FC<IStatusPageProps> = ({ 
  statuses, 
  createStatus, 
  editStatus,
  deleteStatus
}) => {
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

  const handleCloseModal = () => {
    setVisible(false);
  }

  const modal = (
    <Modal header='Создать статус' onClose={handleCloseModal}>
      <FormStatus
        onSubmit={createSubmit}
        onChange={handleChange}
        values={values}
        isValid={isValid}
        onCancel={cancel}
      />
    </Modal>
  )

  return (
    <div>
      <ul>
        {[...statuses].map(item => (
          <StatusItem 
            element={item} 
            editStatus={editStatus} 
            deleteStatus={deleteStatus} 
            key={item.id}
          />
        ))}
      </ul>
      {!visible && (
        <Button className={statusStyles.button} clickHandler={onCreateStatus}>
          Создать статус
        </Button>
      )}
      {visible && modal}
    </div>
  )
}