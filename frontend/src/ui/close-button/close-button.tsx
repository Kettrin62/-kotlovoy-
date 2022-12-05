import { FC } from 'react';
import styles from '../close-button/close-button.module.css';
import cn from 'classnames';
import closeIcon from '../../images/close.svg';

interface ICloseButtonProps {
  extraClass?: string;
  onClose: () => void;
}

const CloseButton: FC<ICloseButtonProps> = ({ extraClass, onClose }) => (
  <button type='button' className={cn(styles.button, extraClass)} onClick={onClose}>
    <img src={closeIcon} alt='Закрыть' className={styles.img} />
  </button>
)


export default CloseButton