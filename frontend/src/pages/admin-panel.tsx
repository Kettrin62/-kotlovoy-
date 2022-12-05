import { FC, useState, useEffect, useContext } from 'react';
import { 
  useLocation,
  Redirect
} from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileNav from '../components/profile-nav/profile-nav';
import { OrdersPage } from './orders';
import api from '../api';
import { TDelivery, TFormStatus, TStatus } from '../services/types/data';
import { AuthContext } from '../services/contexts/auth-context';
import { UsersPage } from './users';
import { AdminDeliveryPage } from './admin-delivery';
import { StatusPage } from './status';

interface IAdminPanelPageProps {
  onLogout: () => void;
  addDelivery: (data: TDelivery, set: (el: boolean) => void) => void;
  editDelivery: (id: number, data: TDelivery) => void;
  deleteDelivery: (id: number) => void;
}

export const AdminPanelPage: FC<IAdminPanelPageProps> = ({ 
  onLogout,
  addDelivery,
  editDelivery,
  deleteDelivery
}) => {
  const [statuses, setStatuses] = useState<Array<TStatus>>([]);
  const { auth } = useContext(AuthContext)

  const location = useLocation()

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
        set(false);
        getStatuses();
      })
      .catch(err => console.log(err));
  };

  const editStatus = (id: number, data: TFormStatus) => {
    api 
      .editStatus(id, data)
      .then(res => {
        getStatuses();
      })
      .catch(err => console.log(err));
  };

  const deleteStatus = (id: number) => {
    api 
      .deleteStatus(id)
      .then(res => {
        getStatuses();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (auth.isAdmin) {
      getStatuses();
    }
  }, [])

  if (!auth.isAdmin) {
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
        <AdminDeliveryPage 
          addDelivery={addDelivery}
          editDelivery={editDelivery}
          deleteDelivery={deleteDelivery}
        />
      )}
      {location.pathname === '/admin-panel/status' && (
        <StatusPage 
          statuses={statuses} 
          createStatus={createStatus} 
          editStatus={editStatus}
          deleteStatus={deleteStatus}
        />
      )}
    </section>
  )
}
