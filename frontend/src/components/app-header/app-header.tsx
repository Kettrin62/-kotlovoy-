import * as React from 'react';
import Navigation from '../navigation/navigation';
import appheaderStyles from './app-header.module.css';
import { useCallback, useState, useEffect, useContext } from 'react';
import { 
  useHistory,
  useLocation
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
import Button from '../button/button';
import cn from 'classnames';
import Text from '../text/text';
import { pathNames } from '../../utils/data';
import LinkWhatsApp from '../links-buttons-image/link-whatsapp';
import LinkMain from '../links-buttons-image/link-main';
import { DataCartContext } from '../../services/contexts/app-context';
import AuthContext from '../../services/contexts/auth-context';

function AppHeader() {

  const history = useHistory();
  const { pathname } = useLocation();
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const [count, setCount] = useState<number>(0);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setCount(dataCart.length);
  }, [dataCart]);


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
      history.replace({ pathname: `/elements/search/${inputValue}` });
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

  const onClickLink = useCallback(
    (path: string) => {
      history.replace({ pathname: path });
    },
    [history]
  );

  const onClickCart = useCallback(
    () => {
      history.replace({ pathname: '/cart' });
    },
    [history]
  );

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

  const onClickProfile = useCallback(
    () => {
      history.replace({ pathname: '/profile' });
    },
    [history]
  );

  const login = authContext ? true : false;

  return (
    <>
      <header className={appheaderStyles.header}>
        <Menu />
        <Navigation>
          <div className={appheaderStyles.container}>
            <Link class={cn(appheaderStyles.link, classLink)} onClick={onClickMain}>
              <LinkMain />
              {/* <Title /> */}
            </Link>
            <div className={cn(appheaderStyles.box, classBox, appheaderStyles.indent)}>
              <Link class={appheaderStyles.link} onClick={() => onClickLink(pathNames.elements)}>
                <Text class={appheaderStyles.text} text='Каталог' />
              </Link>
              <Link class={appheaderStyles.link} onClick={() => onClickLink(pathNames.pay)}>
                <Text class={appheaderStyles.text} text='Оплата' />
              </Link>
              <Link class={appheaderStyles.link} onClick={() => onClickLink(pathNames.delivery)}>
                <Text class={appheaderStyles.text} text='Доставка' />
              </Link>
            </div>
            <Link class={cn(appheaderStyles.link, classLink, appheaderStyles.indent)} onClick={() => {}}>
              <LinkWhatsApp />
            </Link>
          </div>
          <div className={cn(appheaderStyles.container, appheaderStyles.indent)}>
            <SearchBar 
              className={classSearchBar} 
              onClickClose={onClickClose} 
              // reset={inputClear}
              inputValue={inputValue}
              onChangeInput={onChangeInputValue}
              onClickSearch={onClickSearchElements}
            />
            <Button className={classButton} clickHandler={onClickSearch}>
              <LinkSearch class={appheaderStyles.search} />
            </Button>
            <Link class={appheaderStyles.link} onClick={onClickCart}>
              <LinkCart count={count} />
            </Link>
            <Link class={cn(appheaderStyles.link, classLink)} onClick={onClickProfile}>
              <LinkAccount login={login} />
            </Link>
          </div>
        </Navigation>
      </header>
      <Divider />
    </>
  )
}

export default AppHeader;