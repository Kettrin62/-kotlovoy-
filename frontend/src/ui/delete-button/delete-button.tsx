import { FC } from 'react';
import styles from './delete-button.module.css';
import cn from 'classnames';
import deleteIcon from '../../images/delete.svg';

interface IDeleteButtonProps {
  extraClass?: string;
  onDelete: () => void;
}

export const DeleteButton: FC<IDeleteButtonProps> = ({ extraClass, onDelete }) => (
  <button type="button" className={cn(styles.button, extraClass)} onClick={onDelete}>
    <img src={deleteIcon} />
  </button>
);

