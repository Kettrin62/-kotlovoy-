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
  const [text, setText] = useState<string>('');

  const { values, handleChange, isValid, resetForm } = useFormStatus();

  const onCreateStatus = () => {
    setVisible(true)
  };

  const createSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statuses.some(item => item.status === values.status)) {
      createStatus(values, setVisible)
    } else {
      setText('Такой статус уже существует');
    }
    resetForm();
  };

  const cancel = () => {
    resetForm();
    setVisible(false);
    setText('');
  }

  const handleCloseModal = () => {
    resetForm();
    setVisible(false);
    setText('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText('');
    handleChange(event);
  }

  const modal = (
    <Modal header='Создать статус' onClose={handleCloseModal}>
      <FormStatus
        onSubmit={createSubmit}
        onChange={onChange}
        values={values}
        isValid={isValid}
        onCancel={cancel}
      />
      {text && <p className={statusStyles.text}>{text}</p>}
    </Modal>
  )

  return (
    <div className={statusStyles.container}>
      <ul className={statusStyles.list}>
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