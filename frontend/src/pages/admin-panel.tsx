import { FC, useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useRouteMatch,
  useHistory,
  useLocation,
  Redirect
} from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileNav from '../components/profile-nav/profile-nav';
import { ProfileProfilePage } from './profile-profile';
import { OrdersPage } from './orders';
import { ProfileSetPasswordPage } from './profile-set-password';
import { OrderInfoPage } from './order-info';

interface IAdminPanelPageProps {
  onLogout: () => void;
  isAdmin: boolean;
}

export const AdminPanelPage: FC<IAdminPanelPageProps> = ({ onLogout, isAdmin }) => {
  const location = useLocation()
  console.log(location);

  if (!isAdmin) {
    return (
      <Redirect to='/profile' />
    )
  };
  

  return (
    <section className={profileStyles.container}>
      <ProfileNav onClickLogout={onLogout} isAdmin={isAdmin} />
      {location.pathname === '/admin-panel/orders' && (
        <OrdersPage />
      )}
    </section>
  )
}
