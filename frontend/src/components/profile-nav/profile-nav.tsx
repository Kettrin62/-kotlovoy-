import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../services/contexts/auth-context';
import profilenavStyles from './profile-nav.module.css';
import cn from 'classnames';

interface IProfileNavProps {
  onClickLogout: () => void;
}

const ProfileNav: FC<IProfileNavProps> = ({ onClickLogout }) => {
  const { auth } = useContext(AuthContext);
  const { isAdmin } = auth;

  return (
    <div className={'mr-15 ' + profilenavStyles.navigation}>
      <ul className={profilenavStyles.list}>
        <li>
          <NavLink
            exact
            to={!isAdmin ? '/profile' : '/admin-panel/orders'}
            className={profilenavStyles.link}
            activeClassName={cn(profilenavStyles.link, profilenavStyles.link_active)}
          >
            {!isAdmin ? 'Профиль' : 'Заказы'}
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