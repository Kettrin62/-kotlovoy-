import * as React from 'react';
import Navigation from '../navigation/navigation';
import appheaderStyles from './app-header.module.css';
import { useCallback, useState, useEffect, useContext } from 'react';
import { 
  useHistory,
} from 'react-router-dom';
import { Link} from 'react-router-dom';
import LinkCart from '../links-buttons-image/link-cart';
import LinkAccount from '../links-buttons-image/link-account';
import LinkSearch from '../links-buttons-image/link-search';
import Menu from '../menu/menu';
import Divider from '../divider/divider';
import SearchBar from '../search-bar/search-bar';
import Button from '../button/button';
import cn from 'classnames';
import Text from '../text/text';
import { pathNames } from '../../utils/data';
import LinkWhatsApp from '../links-buttons-image/link-whatsapp';
import LinkMain from '../links-buttons-image/link-main';
import { DataCartContext } from '../../services/contexts/app-context';
import { AuthContext } from '../../services/contexts/auth-context';
import { hrefWhatsApp } from '../../utils/constants';

function AppHeader() {

  const history = useHistory();
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { dataCart } = useContext(DataCartContext);
  const [count, setCount] = useState<number>(0);
  const { auth } = useContext(AuthContext);

  const { loggedIn, isAdmin } = auth;

  useEffect(() => {
    setCount(dataCart.length);
  }, [dataCart]);

  const onClickMain = useCallback(
    () => {
      onClickClose();
    },
    [history]
  );

  const onClickSearch = () => {
    setVisibleSearchBar(true);
    setVisibleButton(false);
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
    setInputValue('');
  };

  const onClickSearchElements = useCallback(
    () => {
      inputValue && history.replace({ pathname: `/elements/search/${inputValue}` });
    },
    [history, inputValue]
  );

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const classLink = visibleButton
    ? ''
    : appheaderStyles.link_hide;

  const classBox = visibleButton
  ? ''
  : appheaderStyles.box_hide;

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (visibleSearchBar && event.key === 'Enter') {
        event.preventDefault();
        onClickSearchElements();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [inputValue]);

  return (
    <>
      <header className={appheaderStyles.header}>
        <Menu />
        <Navigation>
          <div className={appheaderStyles.container}>
            <Link className={cn(appheaderStyles.link, classLink)} to={pathNames.main} onClick={onClickMain}>
              <LinkMain />
            </Link>
            <div className={cn(appheaderStyles.box, classBox, appheaderStyles.indent)}>
              <Link className={appheaderStyles.link} to={pathNames.elements}>
                <Text class={appheaderStyles.text} text='Каталог' />
              </Link>
              <Link className={appheaderStyles.link} to={pathNames.payDelivery}>
                <Text class={appheaderStyles.text} text='Оплата и доставка' />
              </Link>
            </div>
            <a className={cn(appheaderStyles.link, classLink, appheaderStyles.indent)} href={hrefWhatsApp}>
              <LinkWhatsApp />
            </a>
          </div>
          <div className={cn(appheaderStyles.container, appheaderStyles.indent)}>
            <SearchBar 
              className={classSearchBar} 
              onClickClose={onClickClose} 
              inputValue={inputValue}
              onChangeInput={onChangeInputValue}
              onClickSearch={onClickSearchElements}
            />
            <Button className={classButton} clickHandler={onClickSearch}>
              <LinkSearch class={appheaderStyles.search} />
            </Button>
            <Link className={appheaderStyles.link} to='/cart'>
              <LinkCart count={count} />
            </Link>
            <Link className={cn(appheaderStyles.link, classLink)} to={isAdmin ? '/admin-panel/orders' : '/profile'}>
              <LinkAccount login={loggedIn} />
            </Link>
          </div>
        </Navigation>
      </header>
      <Divider />
    </>
  )
}

export default AppHeader;