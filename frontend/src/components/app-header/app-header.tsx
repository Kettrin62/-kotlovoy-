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





function AppHeader() {

  const history = useHistory();
  const { pathname } = useLocation();

  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );

  return (
    <>
      <header className={appheaderStyles.header}>
        <Menu />
        <Navigation >
          <Link class={appheaderStyles.link} onClick={onClickMain}>
            <Title />
          </Link>
          <button className={appheaderStyles.button} onClick={onClickMain}>
            <LinkSearch />
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