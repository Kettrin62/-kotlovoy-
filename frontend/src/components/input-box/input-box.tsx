import { useEffect, useState } from 'react';
import inputboxStyles from './input-box.module.css';
import cn from 'classnames';
import { FC } from 'react';
import Button from '../button/button';
// import Input from '../../ui/input/input';
import Input from '../input/input';


interface IInputBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className: string | undefined,
  name?: string | undefined,
  required?: boolean,
  onFocus?: any,
  value: string,
  reset?: boolean,
  onClickButtonUp: () => void,
  onClickButtonDown: () => void,
  inputRef?: React.Ref<HTMLInputElement>;
}

const InputBox: FC<IInputBoxProps> = ({
    onChange,
    className,
    name,
    required,
    onFocus,
    value = '1',
    reset,
    onClickButtonUp,
    onClickButtonDown,
    inputRef
  }) => {

  const [ inputValue, setInputValue ] = useState(value);

  // const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   setInputValue(value)
  //   onChange(e)
  // };

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value)
    }
    if (reset) {
      setInputValue('1')
    }
  }, [value, reset]);

  // console.log(inputValue);
  


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
        // className=''
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
