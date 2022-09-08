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
import LinkCart from '../links-buttons-image/link-cart';
import LinkAccount from '../links-buttons-image/link-account';
import LinkSearch from '../links-buttons-image/link-search';
import Menu from '../menu/menu';
import Divider from '../divider/divider';
import Input from '../input/input';
import SearchBar from '../search-bar/search-bar';
import { useState } from 'react';
import Button from '../button/button';






function AppHeader() {

  const history = useHistory();
  const { pathname } = useLocation();
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const [inputClear, setInputClear] = useState(false);


  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
      onClickClose();
    },
    [history]
  );

  const onClickSearch = () => {
    setVisibleSearchBar(true);
    setVisibleButton(false);
    setInputClear(false);
  };

  const classSearchBar = visibleSearchBar
    ? appheaderStyles.bar_show
    : appheaderStyles.bar_hide;

  const classButton = visibleButton
    ? appheaderStyles.bar_show
    : appheaderStyles.bar_hide

  const onClickClose = () => {
    setVisibleSearchBar(false);
    setVisibleButton(true);
    setInputClear(true);
  };

  return (
    <>
      <header className={appheaderStyles.header}>
        <Menu />
        <Navigation >
          <Link class={appheaderStyles.link} onClick={onClickMain}>
            <Title />
          </Link>
          <SearchBar 
            className={classSearchBar} 
            onClickClose={onClickClose} 
            reset={inputClear}
          />
          <Button className={classButton} clickHandler={onClickSearch}>
            <LinkSearch class={appheaderStyles.search} />
          </Button>
          {/* <button className={appheaderStyles.button} onClick={onClickSearch}>
          </button> */}
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