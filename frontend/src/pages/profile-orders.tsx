import * as React from 'react';
import { useEffect, useState } from 'react';
import api from '../api';
import CardOrder from '../components/card-order/card-order';
import { TCardOrderUser } from '../services/types/data';
import profileordersStyles from './profile-orders.module.css';


export function ProfileOrdersPage() {
  const [ordersUser, setOrdersUser] = useState<Array<TCardOrderUser>>([]);

  // console.log(ordersUser);

  const getOrders = () => {
    api
      .getOrders()
      .then(res => setOrdersUser(res.results))
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  useEffect(() => {
    getOrders()
  }, []);

  return (
    <ul className={profileordersStyles.list}>
      {[...ordersUser].map(item => (
        <CardOrder key={item.id} card={item} />
      ))}
    </ul>
  );
}