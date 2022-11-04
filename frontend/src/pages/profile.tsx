import { FC, useState, useEffect } from 'react';
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

interface IProfilePageProps {
  onLogout: () => void;
  isAdmin: boolean;
}

export const ProfilePage: FC<IProfilePageProps> = ({ onLogout, isAdmin }) => {
  const location = useLocation()

  if (isAdmin) {
    return (
      <Redirect to='/admin-panel' />
    )
  };

  return (
    <section className={profileStyles.container}>
      {/* <Router> */}
      {location.pathname !== '/profile/orders/:id' && (
        <ProfileNav onClickLogout={onLogout} isAdmin={isAdmin} />
      )}
        {/* <Switch> */}
          {/* <Route path='/profile' exact={true}> */}
          {location.pathname === '/profile' && (
            <ProfileProfilePage />
          )}
          {/* </Route> */}
          {/* <Route path='/profile/set-password' exact={true}> */}
          {location.pathname === '/profile/set-password' && (
            <ProfileSetPasswordPage />
          )}
          {/* </Route> */}
          {/* <Route path='/profile/orders' exact={true}> */}
          {location.pathname === '/profile/orders' && (
            <OrdersPage />
          )}
          {/* </Route> */}
          {/* <Route path='/profile/orders/:id' exact={true}> */}
          {location.pathname === '/profile/orders/:id' && (
            <OrderInfoPage isAdmin={isAdmin} />
          )}
          {/* </Route> */}
        {/* </Switch> */}
      {/* </Router> */}
    </section>
  );
}
