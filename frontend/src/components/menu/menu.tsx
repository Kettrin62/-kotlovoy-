// import Link from '../link/link';
import menuStyles from './menu.module.css';
import { useEffect, useCallback, useRef, useState } from 'react';
import { 
  useHistory,
  useLocation,
  Link
} from 'react-router-dom';
import Title from '../title/title';
import Navigation from '../navigation/navigation';
import Text from '../text/text';
import { pathNames } from '../../utils/data';

function Menu() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // const onClickLink = useCallback(
  //   (path: string) => {
  //     // history.replace({ pathname: path });
  //     setVisible(false);
  //   },
  //   [history]
  // );

  const onClickLink = () => {
    setVisible(false);
  }

  const onClickMenu = () => {
    setVisible(true);
  };

  const onClickButtonClose = () => {
    setVisible(false);
  };

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  const classMenu = visible
    ? menuStyles.menu + ' ' + menuStyles.menu_show
    : menuStyles.menu + ' ' + menuStyles.menu_hide;



  return (
    <div className={menuStyles.container} ref={ref}>
      <button type='button' className={menuStyles.button} onClick={onClickMenu}>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
      </button>
      <div className={classMenu}>
        <button type="button" className={menuStyles.button_close} onClick={onClickButtonClose}></button>
        <nav className={menuStyles.nav}>
          <Link className={menuStyles.link} to={pathNames.main} onClick={onClickLink}>
            <Title />
          </Link>
          <Link className={menuStyles.link} to={pathNames.elements} onClick={onClickLink}>
            <Text class='' text='Каталог' />
          </Link>
          <Link className={menuStyles.link} to={pathNames.pay} onClick={onClickLink}>
            <Text class='' text='Оплата' />
          </Link>
          <Link className={menuStyles.link} to={pathNames.delivery} onClick={onClickLink}>
            <Text class='' text='Доставка' />
          </Link>
          <Link className={menuStyles.link} to={pathNames.about} onClick={onClickLink}>
            <Text class='' text='О нас' />
          </Link>
          <Link className={menuStyles.link} to={pathNames.contacts} onClick={onClickLink}>
            <Text class='' text='Контакты' />
          </Link>
          <Link className={menuStyles.link} to={pathNames.feedback} onClick={onClickLink}>
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