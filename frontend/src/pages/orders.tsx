import * as React from 'react';
import { useEffect, useState } from 'react';
import api from '../api';
import CardOrder from '../components/card-order/card-order';
import { TCardOrder } from '../services/types/data';
import ordersStyles from './orders.module.css';


export function OrdersPage() {
  const [orders, setOrders] = useState<Array<TCardOrder>>([]);
  

  // console.log(ordersUser);

  const getOrders = () => {
    api
      .getOrders()
      .then(res => setOrders(res.results))
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
    <ul className={ordersStyles.list}>
      {[...orders].map(item => (
        <CardOrder key={item.id} card={item} />
      ))}
    </ul>
  );
}