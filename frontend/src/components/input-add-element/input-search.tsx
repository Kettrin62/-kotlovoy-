import * as React from 'react';
import { FC } from 'react';
import styles from './input-search.module.css';
import { useCallback } from 'react';
import { 
  useHistory,
  useLocation,
} from 'react-router-dom';
import Input from '../input/input';
import cn from 'classnames';
import LinkClose from '../links-buttons-image/link-close';
import Button from '../button/button';

interface IInputSearchProps {
  className?: string,
  onClickClose: () => void;
  inputValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: () => void;
  onFocus?: () => void;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
}

const InputSearch: FC<IInputSearchProps> = ({ 
  className,
  onClickClose,
  inputValue,
  onChangeInput,
  onClickSearch,
  onFocus,
  label,
  labelClassName,
  placeholder
}) => {

  return (
    <div className={cn(styles.container, className)}>
      <Input
        label={label}
        className={styles.input}
        inputClassName=''
        onChange={onChangeInput}
        value={inputValue}
        onFocus={onFocus}
        labelClassName={labelClassName}
        placeholder={placeholder}
      />
      <Button clickHandler={onClickClose} className={styles.button}>
        <LinkClose />
      </Button>
    </div>
  )
}

export default InputSearch;