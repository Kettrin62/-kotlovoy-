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
  ...props
}) => {
  const className = `${styles.input} ${extraClass} ${inputWithBtn ? styles.input_withBtn : ''}`;
  return (
    <div>
      <label>
      {label && <div>
        {label}
      </div>}
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          ref={inputRef}
          value={value}
          onChange={onChange}
          {...props}
        />
      </label>
    </div>
  );
};

export default Input;
