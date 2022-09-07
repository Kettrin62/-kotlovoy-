import * as React from 'react';
import Navigation from '../navigation/navigation';
import appheaderStyles from './app-header.module.css';
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
import SearchBar from '../search-bar/search-bar';
import { useState } from 'react';






function AppHeader() {

  const history = useHistory();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);


  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );

  const onClickSearch = () => {
    setVisible(true);
  };

  const classSearchBar = visible
    ? appheaderStyles.bar_show
    : appheaderStyles.bar_hide

  return (
    <>
      <header className={appheaderStyles.header}>
        <Menu />
        <Navigation >
          <Link class={appheaderStyles.link} onClick={onClickMain}>
            <Title />
          </Link>
          <SearchBar />
          <button className={appheaderStyles.button} onClick={onClickSearch}>
            <LinkSearch class={appheaderStyles.search} />
          </button>
          <Link class={appheaderStyles.link} onClick={onClickMain}>
            <LinkCart />
          </Link>
          <Link class={appheaderStyles.link} onClick={onClickMain}>
            <LinkAccount />
          </Link>
        </Navigation>
      </header>
      <Divider />
    </>
  )
}

export default AppHeader;