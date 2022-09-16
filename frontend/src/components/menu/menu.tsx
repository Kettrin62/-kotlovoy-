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
import { pathNames } from '../../utils/data';

function Menu() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const onClickLink = useCallback(
    (path: string) => {
      history.replace({ pathname: path });
      setVisible(false);
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
    : menuStyles.menu + ' ' + menuStyles.menu_hide;



  return (
    <div className={menuStyles.container}>
      <button type='button' className={menuStyles.button} onClick={onClickMenu}>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
      </button>
      <div className={classMenu}>
        <button type="button" className={menuStyles.button_close} onClick={onClickButtonClose}></button>
        <nav className={menuStyles.nav}>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.main)}>
            <Title />
          </Link>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.elements)}>
            <Text class='' text='Каталог' />
          </Link>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.pay)}>
            <Text class='' text='Оплата' />
          </Link>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.delivery)}>
            <Text class='' text='Доставка' />
          </Link>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.about)}>
            <Text class='' text='О нас' />
          </Link>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.contacts)}>
            <Text class='' text='Контакты' />
          </Link>
          <Link class={menuStyles.link} onClick={() => onClickLink(pathNames.feedback)}>
            <Text class='' text='Написать нам' />
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