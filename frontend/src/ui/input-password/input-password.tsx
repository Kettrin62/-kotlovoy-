import React, { FC, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../input/input';
import styles from './input-password.module.css';
import visibleIcon from '../../images/visible.svg';
import invisibleIcon from '../../images/invisible.svg';

interface IInputPasswordProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  name?: string;
  value?: string;
  className?: string;
}

const InputPassword: FC<IInputPasswordProps> = ({
  handleChange,
  placeholder = 'Пароль',
  inputRef,
  name = 'password',
  value, 
  className
}) => {
  const [visible, setVisible] = useState(false);

  const onClickVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={styles.input}>
      <Input
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        required
        inputRef={inputRef}
        value={value}
        extraClass={className}
      />
      <Button className={styles.icon} clickHandler={onClickVisible}>
        <img src={visible ? invisibleIcon : visibleIcon} alt='Иконка глаза' />
      </Button>
    </div>
  )
}

export default InputPassword;