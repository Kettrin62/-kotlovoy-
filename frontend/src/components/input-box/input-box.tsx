import { useEffect, useState } from 'react';
import inputboxStyles from './input-box.module.css';
import cn from 'classnames';
import { FC } from 'react';
import Button from '../button/button';
import Input from '../input/input';

interface IInputBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className: string | undefined,
  value: string,
  reset?: boolean,
  onClickButtonUp: () => void,
  onClickButtonDown: () => void,
  inputRef?: React.Ref<HTMLInputElement>;
}

const InputBox: FC<IInputBoxProps> = ({
    onChange,
    className,
    value = '1',
    reset,
    onClickButtonUp,
    onClickButtonDown,
    inputRef
  }) => {

  const [ inputValue, setInputValue ] = useState(value);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value)
    }
    if (reset) {
      setInputValue('1')
    }
  }, [value, reset]);

  return (
    <div className={cn(inputboxStyles.box, className)}>
      <Button 
        clickHandler={onClickButtonDown}
        className={inputboxStyles.button}
      >
        -
      </Button>
      <Input
        onChange={onChange}
        inputClassName={inputboxStyles.input}
        value={value}
        maxLength={4}
        type='text'
        name='count'
        inputRef={inputRef}
      />
      <Button 
        clickHandler={onClickButtonUp}
        className={inputboxStyles.button}
      >
        +
      </Button>
    </div>
  )
}

export default InputBox;
