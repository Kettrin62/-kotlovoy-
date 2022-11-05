import { FC } from 'react';
import styles from '../delete-button/delete-button.module.css';
import cn from 'classnames';
import closeIcon from '../../images/close.svg';

interface ICloseButtonProps {
  extraClass?: string;
  onClose: () => void;
}

const CloseButton: FC<ICloseButtonProps> = ({ extraClass, onClose }) => {
  return (
    <button type='button' className={cn(styles.button, extraClass)} onClick={onClose}>
      <img src={closeIcon} alt='Закрыть' />
    </button>
  )
}

export default CloseButton