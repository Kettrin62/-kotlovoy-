import React, { FC, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../input/input';
import styles from './input-edit.module.css';
import editIcon from '../../images/edit.svg';
import { Value } from 'classnames';

interface IInputEditProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  required?: boolean;
  label?: string;
  value: string;
  name: string;
  className?: string;
  classLabel?: string;
}

const InputEdit: FC<IInputEditProps> = ({
  handleChange,
  placeholder,
  inputRef,
  required,
  label,
  value,
  name,
  className,
  classLabel
}) => {

  return (
    <div className={styles.input}>
      <Input
        type='text'
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        required={required}
        inputRef={inputRef}
        label={label}
        value={value}
        extraClass={className}
        classLabel={classLabel}
      />
      <img src={editIcon} alt='Иконка-карандаш' className={styles.icon} />
    </div>
  )
}

export default InputEdit;