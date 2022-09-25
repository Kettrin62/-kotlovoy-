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
import cn from 'classnames';
import Text from '../text/text';
import { pathNames } from '../../utils/data';
import LinkWhatsApp from '../links-buttons-image/link-whatsapp';






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

  const classLink = visibleButton
    ? ''
    : appheaderStyles.link_hide;

  const onClickLink = useCallback(
    (path: string) => {
      history.replace({ pathname: path });
    },
    [history]
  );

  const classBox = visibleButton
  ? ''
  : appheaderStyles.box_hide;

  return (
    <>
      <header className={appheaderStyles.header}>
        <Menu />
        <Navigation>
          <div className={appheaderStyles.container}>
            <Link class={cn(appheaderStyles.link, classLink)} onClick={onClickMain}>
              <Title />
            </Link>
            <div className={cn(appheaderStyles.box, classBox)}>
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
            <Link class={cn(appheaderStyles.link, classLink)} onClick={() => {}}>
              <LinkWhatsApp />
            </Link>
          </div>
          <div className={appheaderStyles.container}>
            <SearchBar 
              className={classSearchBar} 
              onClickClose={onClickClose} 
              reset={inputClear}
            />
            <Button className={classButton} clickHandler={onClickSearch}>
              <LinkSearch class={appheaderStyles.search} />
            </Button>
            <Link class={appheaderStyles.link} onClick={onClickMain}>
              <LinkCart />
            </Link>
            <Link class={cn(appheaderStyles.link, classLink)} onClick={onClickMain}>
              <LinkAccount />
            </Link>
          </div>
        </Navigation>
      </header>
      <Divider />
    </>
  )
}

export default AppHeader;