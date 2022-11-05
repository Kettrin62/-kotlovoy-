import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { isDataView } from 'util/types';
import AuthContext from '../../services/contexts/auth-context';
import profilenavStyles from './profile-nav.module.css';

interface IProfileNavProps {
  onClickLogout: () => void;
}

const ProfileNav: FC<IProfileNavProps> = ({ onClickLogout }) => {
  const { isAdmin } = useContext(AuthContext)

  return (
    <div className={'mr-15 ' + profilenavStyles.navigation}>
      <ul className={profilenavStyles.list}>
        <li>
          <NavLink
            exact
            to={!isAdmin ? '/profile' : '/admin-panel/orders'}
            className={profilenavStyles.link}
            activeClassName={profilenavStyles.link_active}
          >
            {!isAdmin ? 'Профиль' : 'Заказы'}
            {/* {!isAdmin ? 'Профиль' : 'Пользователи'} */}
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to={!isAdmin ? '/profile/set-password' : '/admin-panel/users'}
            className={profilenavStyles.link}
            activeClassName={profilenavStyles.link_active}
          >
            {!isAdmin ? 'Сменить пароль' : 'Пользователи'}
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to={!isAdmin ? '/profile/orders' : '/admin-panel/delivery'}
            className={profilenavStyles.link}
            activeClassName={profilenavStyles.link_active}
          >
            {!isAdmin ? 'История заказов' : 'Доставка'}
          </NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink
              exact
              to='/admin-panel/status'
              className={profilenavStyles.link}
              activeClassName={profilenavStyles.link_active}
            >
              Статусы
            </NavLink>
          </li>
        )}
        <li>
          <p
            className={profilenavStyles.link}
            onClick={onClickLogout}
          >
            Выход
          </p>
        </li>
      </ul>
    </div>
  )
};

export default ProfileNav;