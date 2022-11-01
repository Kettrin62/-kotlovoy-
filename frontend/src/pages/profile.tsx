import { FC, useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useRouteMatch,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileNav from '../components/profile-nav/profile-nav';
import { ProfileProfilePage } from './profile-profile';
import { ProfileOrdersPage } from './profile-orders';
import { ProfileSetPasswordPage } from './profile-set-password';
import { OrderInfoPage } from './order-info';

interface IProfilePageProps {
  onLogout: () => void;
}

export const ProfilePage: FC<IProfilePageProps> = ({ onLogout }) => {
  return (
    <section className={profileStyles.container}>
      <Router>
        <ProfileNav onClickLogout={onLogout} />
        <Switch>
          <Route path='/profile' exact={true}>
            <ProfileProfilePage />
          </Route>
          <Route path='/profile/set-password' exact={true}>
            <ProfileSetPasswordPage />
          </Route>
          <Route path='/profile/orders' exact={true}>
            <ProfileOrdersPage />
          </Route>
          <Route path='/profile/orders/:id' exact={true}>
            <OrderInfoPage />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}
