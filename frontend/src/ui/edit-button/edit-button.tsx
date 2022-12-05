import { FC } from 'react';
import styles from '../delete-button/delete-button.module.css';
import cn from 'classnames';
import editIcon from '../../images/edit.svg';

interface IEditButtonProps {
  extraClass?: string;
  onEdit: () => void;
}

const EditButton: FC<IEditButtonProps> = ({ extraClass, onEdit }) => (
  <button type='button' className={cn(styles.button, extraClass)} onClick={onEdit}>
    <img src={editIcon} alt='Иконка редактирования' />
  </button>
)

export default EditButton