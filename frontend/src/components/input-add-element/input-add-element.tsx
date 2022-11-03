import * as React from 'react';
import { FC } from 'react';
import styles from './input-add-element.module.css';
import { useCallback } from 'react';
import { 
  useHistory,
  useLocation,
} from 'react-router-dom';
import LinkSearch from '../links-buttons-image/link-search';
import Input from '../input/input';
import cn from 'classnames';
import LinkClose from '../links-buttons-image/link-close';
import Button from '../button/button';


interface ISearchBarProps {
  className: string,
  onClickClose: () => void;
  inputValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: () => void;
  onFocus?: () => void;
}


const InputAddElement: FC<ISearchBarProps> = ({ 
  className,
  onClickClose,
  inputValue,
  onChangeInput,
  onClickSearch,
  onFocus
}) => {

  const history = useHistory();
  const { pathname } = useLocation();

  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );



  return (
    <div className={cn(styles.container, className)}>
      <Input
        label='Элементы'
        className={styles.input}
        inputClassName=''
        onChange={onChangeInput}
        value={inputValue}
        onFocus={onFocus}
      />
      <Button clickHandler={onClickClose} className={styles.button}>
        <LinkClose />
      </Button>
    </div>
  )
}

export default InputAddElement;