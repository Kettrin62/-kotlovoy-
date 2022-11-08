import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import api from '../api';
import Button from '../components/button/button';
import CardOrder from '../components/card-order/card-order';
import OrdersSearch from '../components/orders-search/order-search';
import Text from '../components/text/text';
import { TCardOrder, TStatus } from '../services/types/data';
import ordersStyles from './orders.module.css';
import cn from 'classnames';
import LinkClose from '../components/links-buttons-image/link-close';
import filterStyles from './elements.module.css';

interface IOrdersPage {
  statuses?: Array<TStatus>;
}

export const OrdersPage: FC<IOrdersPage> = ({ statuses }) => {
  const [orders, setOrders] = useState<Array<TCardOrder>>([]);
  const [selectStatus, setSelectStatus] = useState<number>(0);
  const [ordersSelect, setOrdersSelect] = useState<Array<TCardOrder>>([]);

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

  const onClickHandler = (idStatus: number) => {
    if (selectStatus !== idStatus) {
      api
        .getOrdersStatus(idStatus)
        .then(res => {
          setOrdersSelect(res.results)
          setSelectStatus(idStatus)
        })
        .catch(err => {
          const errors = Object.values(err)
          if (errors) {
            alert(errors.join(', '))
          }
        })
    } else {
      setSelectStatus(0);
      setOrdersSelect([]);
    }
  }

  const filter = statuses && (
    <ul className={cn(filterStyles.list_group, filterStyles.show, ordersStyles.filter)}>
      {statuses.map(item => {
        const classActive = selectStatus === item?.id ? filterStyles.button_group_active : '';
        return (
          <li key={item!.id} className={ordersStyles.box}>
            <Button clickHandler={() => {onClickHandler(item!.id)}} className={cn(filterStyles.button_group, classActive)}>
              <Text text={item!.status} class={filterStyles.text_group} />
              {selectStatus === item?.id && <LinkClose />}
            </Button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className={ordersStyles.container}>
      <OrdersSearch />
      {filter}
      <ul className={ordersStyles.list}>
        {selectStatus > 0 ? ([...ordersSelect].map(item => (
          <CardOrder key={item.id} card={item} />
        ))) : ([...orders].map(item => (
          <CardOrder key={item.id} card={item} />
        )))}
      </ul>
    </div>
  );
}