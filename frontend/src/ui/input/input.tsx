import React, { FC } from 'react';
import styles from './input.module.css';

interface IInputProps {
  type: string;
  placeholder?: string;
  inputWithBtn?: string;
  extraClass?: string,
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
}

const Input: FC<IInputProps> = ({
  type,
  placeholder,
  inputWithBtn,
  extraClass,
  inputRef,
  value,
  onChange,
  ...props
}) => {
  const className = `${styles.input} ${extraClass} ${inputWithBtn ? styles.input_withBtn : ''}`;
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      ref={inputRef}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
