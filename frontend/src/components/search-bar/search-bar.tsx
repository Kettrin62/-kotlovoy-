import * as React from 'react';
import Navigation from '../navigation/navigation';
import searchbarStyles from './searchbar.module.css';
import { useCallback } from 'react';
import { 
  useHistory,
  useLocation,
} from 'react-router-dom';
import Title from '../title/title';
import Link from '../link/link';
import LinkCart from '../links-image/link-cart';
import LinkAccount from '../links-image/link-account';
import LinkSearch from '../links-image/link-search';
import Menu from '../menu/menu';
import Divider from '../divider/divider';
import Input from '../input/input';





function SearchBar() {

  const history = useHistory();
  const { pathname } = useLocation();

  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );



  return (
    <div className={searchbarStyles.container}>
      <LinkSearch />
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
      />
    </div>
  )
}

export default SearchBar;