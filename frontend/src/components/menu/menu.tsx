import Link from '../link/link';
import menuStyles from './menu.module.css';
import { useCallback } from 'react';
import { 
  useHistory,
  useLocation,
} from 'react-router-dom';
import Title from '../title/title';

function Menu() {
  const history = useHistory();
  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );

  return (
    <div className={menuStyles.menu}>
      <button type='button' className={menuStyles.button}>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
        <span className={menuStyles.line}></span>
      </button>
      {/* <Link class={menuStyles.link + ' ' + menuStyles.link_mobile} onClick={onClickMain}>
        <Title />
      </Link> */}
    </div>
  )
}

export default Menu;