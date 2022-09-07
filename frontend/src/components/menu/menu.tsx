import Link from '../link/link';
import menuStyles from './menu.module.css';
import { useCallback, useState } from 'react';
import { 
  useHistory,
  useLocation,
} from 'react-router-dom';
import Title from '../title/title';
import Navigation from '../navigation/navigation';
import Text from '../text/text';

function Menu() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );

  const onClickMenu = () => {
    setVisible(true);
  };

  const onClickButtonClose = () => {
    setVisible(false);
  };

  const classMenu = visible
    ? menuStyles.menu + ' ' + menuStyles.menu_show
    : menuStyles.menu + ' ' + menuStyles.menu_hide

  return (
    <div className={menuStyles.container}>
      <button type='button' className={menuStyles.button} onClick={onClickMenu}>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
      </button>
      <div className={classMenu}>
        <button type="button" className={menuStyles.button_close} onClick={onClickButtonClose}></button>
        <nav className=''>
          <Link class='' onClick={onClickMain}>
            <Title />
          </Link>
          <Link class='' onClick={onClickMain}>
            <Text class='' text='Каталог' />
          </Link>
          <Link class='' onClick={onClickMain}>
            <Text class='' text='О нас' />
          </Link>
          <Link class='' onClick={onClickMain}>
            <Text class='' text='Контакты' />
          </Link>
          <Link class='' onClick={onClickMain}>
            <Text class='' text='Оплата' />
          </Link>
          <Link class='' onClick={onClickMain}>
            <Text class='' text='Доставка' />
          </Link>
        </nav>
      </div>

      {/* <Link class={menuStyles.link + ' ' + menuStyles.link_mobile} onClick={onClickMain}>
        <Title />
      </Link> */}
    </div>
  )
}

export default Menu;