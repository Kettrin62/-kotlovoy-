import { FC, useCallback, useEffect, useState } from 'react';
import { TFormStatus, TStatus } from '../../services/types/data';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import EditButton from '../../ui/edit-button/edit-button';
import { statusesImmutable } from '../../utils/data';
import statusitemStyles from './status-item.module.css';
import Modal from '../../components/modal/modal';
import FormStatus from '../form-status/form-status';
import Button from '../button/button';

interface IStatusItemProps {
  element: TStatus;
  editStatus: (id: number, data: TFormStatus) => void;
  deleteStatus: (id: number) => void;
}

const StatusItem: FC<IStatusItemProps> = ({ element, editStatus, deleteStatus }) => {
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { id, status, comment } = element;

  const isLock = statusesImmutable.some(item => item === id);

  const [values, setValues] = useState<TFormStatus>({
    status,
    comment
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'status') {
      setValues({...values, [name]: value.toLowerCase()})
    } else setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target?.closest("form")!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {
      status,
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
      status,
      comment
    })
  }, [status, comment])

  const editSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editStatus(id, values)
    setVisible(false)
    resetForm();
  }

  const onDeleteStatus = () => {
    deleteStatus(id)
  }

  const handleCloseModal = () => {
    resetForm();
    setVisible(false);
    setConfirm(false);
  }

  const cancel = () => {
    resetForm();
    setVisible(false);
  }

  const modal = (
    <Modal header='Изменить статус' onClose={handleCloseModal}>
      <FormStatus 
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
      <div className={statusitemStyles.box}>
        <p className={statusitemStyles.text}>
          Статусы в заказах будут также удалены.
        </p>
        <p className={statusitemStyles.text}>
          Всё равно удалить?
        </p>
        <div className={statusitemStyles.row}>
          <Button clickHandler={onDeleteStatus} className={statusitemStyles.buttonModal}>Удалить</Button>
          <Button clickHandler={()=> setConfirm(false)} className={statusitemStyles.buttonModal}>Отменить</Button>
        </div>
      </div>
    </Modal>
  )

  return (
    <li className={statusitemStyles.container}>
      <div className={statusitemStyles.content}>
        <h4 className={statusitemStyles.title}>{status}</h4>
        <p className={statusitemStyles.comment}>{comment}</p>
      </div>
      {!isLock && <EditButton onEdit={()=> setVisible(true)} extraClass={statusitemStyles.button} />}
      {!isLock && <DeleteButton onDelete={()=> setConfirm(true)} extraClass={statusitemStyles.button} />}
      {confirm && modalConfirm}
      {visible && modal}
    </li>
  )
}

export default StatusItem