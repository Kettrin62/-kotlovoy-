import { FC, useContext, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
  Redirect
} from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileNav from '../components/profile-nav/profile-nav';
import { ProfileProfilePage } from './profile-profile';
import { OrdersPage } from './orders';
import { ProfileSetPasswordPage } from './profile-set-password';
import { OrderInfoPage } from './order-info';
import AuthContext from '../services/contexts/auth-context';

interface IProfilePageProps {
  onLogout: () => void;
}

export const ProfilePage: FC<IProfilePageProps> = ({ onLogout }) => {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation()

  if (isAdmin) {
    return (
      <Redirect to='/admin-panel' />
    )
  };

  return (
    <section className={profileStyles.container}>
      {location.pathname !== '/profile/orders/:id' && (
        <ProfileNav onClickLogout={onLogout} />
      )}
      {location.pathname === '/profile' && (
        <ProfileProfilePage />
      )}
      {location.pathname === '/profile/set-password' && (
        <ProfileSetPasswordPage />
      )}
      {location.pathname === '/profile/orders' && (
        <OrdersPage />
      )}
      {location.pathname === '/profile/orders/:id' && (
        <OrderInfoPage />
      )}
    </section>
  );
}
