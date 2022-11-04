import { useEffect, useState } from 'react';
import inputStyles from './input.module.css';
import cn from 'classnames';
import { FC } from 'react';


interface IInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label?: string | undefined,
  type?: 'text',
  inputClassName?: string | undefined,
  labelClassName?: string | undefined,
  className?: string | undefined,
  name?: string | undefined,
  required?: boolean,
  onFocus?: any,
  onBlur?: any,
  value?: string,
  reset?: boolean,
  maxLength?: number,
  handleKeypress?: (e: any) => void,
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder?: string;
}

const Input: FC<IInputProps> = ({
    onChange,
    label,
    type = 'text',
    inputClassName,
    labelClassName,
    className,
    name,
    required,
    onFocus,
    onBlur,
    value = '',
    reset,
    maxLength,
    handleKeypress,
    inputRef,
    placeholder
  }) => {

  const [ inputValue, setInputValue ] = useState(value);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChange(e)
  };

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value)
    }
    if (reset) {
      setInputValue('')
    }
  }, [value, reset]);


  return <div className={cn(inputStyles.input, className)}>
    <label className={inputStyles.inputLabel}>
      {label && <div className={cn(inputStyles.inputLabelText, labelClassName)}>
        {label}
      </div>}
      <input
        type={type}
        required={required}
        name={name}
        className={cn(inputStyles.inputField, inputClassName)}
        // onChange={e => {
        //   handleValueChange(e)
        // }}
        onChange={onChange}
        onFocus={onFocus}
        value={inputValue}
        onBlur={onBlur}
        maxLength={maxLength}
        onKeyPress={handleKeypress}
        ref={inputRef}
        placeholder={placeholder}
      />
    </label>
  </div>
}

export default Input;
