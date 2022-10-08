import * as React from 'react';
import { FC } from 'react';
import searchbarStyles from './searchbar.module.css';
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
  reset?: boolean;
  inputValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: () => void;
}


const SearchBar: FC<ISearchBarProps> = ({ 
  className,
  onClickClose,
  reset,
  inputValue,
  onChangeInput,
  onClickSearch,
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
    <div className={cn(searchbarStyles.container, className)}>
      <Button clickHandler={onClickClose} className={searchbarStyles.button}>
        <LinkClose />
      </Button>
      <Input
        className={searchbarStyles.input}
        inputClassName=''
        onChange={onChangeInput}
        value={inputValue}
        // reset={reset}
      />
      <Button clickHandler={onClickSearch} className={searchbarStyles.button}>
        <LinkSearch />
      </Button>
    </div>
  )
}

export default SearchBar;