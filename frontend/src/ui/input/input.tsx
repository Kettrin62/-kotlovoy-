import React, { FC } from 'react';
import styles from './input.module.css';

interface IInputProps {
  type: string;
  placeholder?: string;
  inputWithBtn?: string;
  extraClass?: string,
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id?: string;
  required?: boolean;
  label?: string | undefined;
  minLength?: number;
  classLabel?: string;
}

const Input: FC<IInputProps> = ({
  type,
  placeholder,
  inputWithBtn,
  extraClass,
  inputRef,
  value,
  onChange,
  label,
  minLength,
  classLabel,
  ...props
}) => {
  const className = `${styles.input} ${extraClass} ${inputWithBtn ? styles.input_withBtn : ''}`;
  return (
    <div className={styles.container}>
      <label className={classLabel}>
      {label}
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          ref={inputRef}
          value={value}
          onChange={onChange}
          minLength={minLength}
          {...props}
        />
      </label>
    </div>
  );
};

export default Input;
