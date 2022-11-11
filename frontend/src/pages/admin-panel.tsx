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
import { TDelivery, TDeliveryMethod, TFormStatus, TStatus, TUser } from '../services/types/data';
import AuthContext from '../services/contexts/auth-context';
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
  const { isAdmin } = useContext(AuthContext)
  const [users, setUsers] = useState<Array<TUser>>([]);

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

  const getUsers = () => {
    api
      .getUsers()
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  const changeDiscount = (id: number, data: {
    discount: number
  }) => {
    api
      .changeUserDiscount(id, data)
      .then(res => {
        getUsers();
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  useEffect(() => {
    if (isAdmin) {
      getStatuses();
      getUsers();
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
        <UsersPage 
          users={users} 
          changeDiscount={changeDiscount}
        />
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
