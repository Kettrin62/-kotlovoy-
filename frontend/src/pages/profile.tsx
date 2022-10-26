import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileNav from '../components/profile-nav/profile-nav';
import { ProfileProfilePage } from './profile-profile';
import { ProfileOrdersPage } from './profile-orders';

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
          <Route path='/profile/orders' exact={true}>
            <ProfileOrdersPage />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}
