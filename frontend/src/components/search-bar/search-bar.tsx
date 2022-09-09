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
}


const SearchBar: FC<ISearchBarProps> = ({ 
  className,
  onClickClose,
  reset,
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
      <Button clickHandler={onClickClose}>
        <LinkClose />
      </Button>
      <Input
        className=''
        inputClassName=''
        onChange={e => {
          const value = e.target.value
          // setIngredientValue({
          //   ...ingredientValue,
          //   amount: value
          // })
        }}
        value=''
        reset={reset}
      />
      <Button clickHandler={onClickMain}>
        <LinkSearch />
      </Button>
    </div>
  )
}

export default SearchBar;