import * as React from 'react';
import { FC } from 'react';
import searchbarStyles from './searchbar.module.css';
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
}


const SearchBar: FC<ISearchBarProps> = ({ 
  className,
  onClickClose,
  inputValue,
  onChangeInput,
  onClickSearch,
}) => {

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
      />
      <Button clickHandler={onClickSearch} className={searchbarStyles.button}>
        <LinkSearch />
      </Button>
    </div>
  )
}

export default SearchBar;