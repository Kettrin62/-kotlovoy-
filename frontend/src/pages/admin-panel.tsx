import { FC, useState, useEffect, useContext } from 'react';
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
import api from '../api';
import { TDelivery, TDeliveryMethod, TFormStatus, TStatus } from '../services/types/data';
import AuthContext from '../services/contexts/auth-context';
import { UsersPage } from './users';
import { AdminDeliveryPage } from './admin-delivery';
import { StatusPage } from './status';

interface IAdminPanelPageProps {
  onLogout: () => void;
  addDelivery: (data: TDelivery, set: (el: boolean) => void) => void;
}

export const AdminPanelPage: FC<IAdminPanelPageProps> = ({ onLogout, addDelivery }) => {
  const [statuses, setStatuses] = useState<Array<TStatus>>([]);
  const { isAdmin } = useContext(AuthContext)

  const location = useLocation()
  const match = useRouteMatch();

  const getStatuses = () => {
    api
      .getStatuses()
      .then(res => setStatuses(res))
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  const createStatus = (data: TFormStatus, set: (el: boolean) => void) => {
    api
      .createStatus(data)
      .then(res => {
        alert('Статус создан');
        set(false);
        getStatuses();
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (isAdmin) {
      getStatuses();
    }
  }, [])

  if (!isAdmin) {
    return (
      <Redirect to='/profile' />
    )
  };
  

  return (
    <section className={profileStyles.container}>
      <ProfileNav onClickLogout={onLogout} />
      {location.pathname === '/admin-panel/orders' && (
        <OrdersPage statuses={statuses} />
      )}
      {location.pathname === '/admin-panel/users' && (
        <UsersPage />
      )}
      {location.pathname === '/admin-panel/delivery' && (
        <AdminDeliveryPage addDelivery={addDelivery}/>
      )}
      {location.pathname === '/admin-panel/status' && (
        <StatusPage statuses={statuses} createStatus={createStatus} />
      )}
    </section>
  )
}
