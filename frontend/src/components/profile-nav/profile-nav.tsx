import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { isDataView } from 'util/types';
import profilenavStyles from './profile-nav.module.css';

interface IProfileNavProps {
  onClickLogout: () => void;
  isAdmin: boolean;
}

const ProfileNav: FC<IProfileNavProps> = ({ onClickLogout, isAdmin }) => {
  const { pathname } = useLocation();
  console.log(pathname);

  const comment = (
    (pathname === '/profile' || pathname === '/profile/set-password') ? (
      <p className=''>
        В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
      </p>) : (
      <p className=''>
        В&nbsp;этом разделе вы&nbsp;можете просмотреть&nbsp;свою историю заказов
      </p>
    )
  )
  

  return (
    <div className={'mr-15 ' + profilenavStyles.navigation}>
      <ul className={profilenavStyles.list}>
        <li>
          <NavLink
            exact
            to={!isAdmin ? '/profile' : '/admin-panel/users'}
            className={profilenavStyles.link}
            activeClassName={profilenavStyles.link_active}
          >
            {!isAdmin ? 'Профиль' : 'Пользователи'}
          </NavLink>
        </li>
        {!isAdmin && (
          <li>
            <NavLink
              exact
              to='/profile/set-password'
              className={profilenavStyles.link}
              activeClassName={profilenavStyles.link_active}
            >
              Сменить пароль
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink
              exact
              to='/admin-panel/delivery'
              className={profilenavStyles.link}
              activeClassName={profilenavStyles.link_active}
            >
              Доставка
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink
              exact
              to='/admin-panel/statuses'
              className={profilenavStyles.link}
              activeClassName={profilenavStyles.link_active}
            >
              Статусы
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            exact
            to={!isAdmin ? '/profile/orders' : '/admin-panel/orders'}
            className={profilenavStyles.link}
            activeClassName={profilenavStyles.link_active}
          >
            {!isAdmin ? 'История заказов' : 'Заказы'}
          </NavLink>
        </li>
        <li>
          <p
            className={profilenavStyles.link}
            onClick={onClickLogout}
          >
            Выход
          </p>
        </li>
      </ul>
      {!isAdmin && comment}
    </div>
  )
};

export default ProfileNav;