import * as React from 'react';
import { useEffect, useState, FC, useContext, useCallback } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import api from '../api';
import Button from '../components/button/button';
import { priceFormat } from '../components/total-price/utils';
import { TContacts, TDeliveryInfo, TDeliveryMethod, TElementOrder, TOrderInfo, TStatus } from '../services/types/data';
import { showMessageDateTime } from '../utils/functions';
import orderinfoStyles from './order-info.module.css';
import cn from 'classnames';
import Status from '../components/status/status';
import Contacts from '../components/contacts/contacts';
import ElementsCardOrder from '../components/elements-card-order/elements-card-orders';
import ListElementsSearch from '../components/list-elements-search/list-elements-search';
import DeliveryOrderInfo from '../components/delivery-order-info/delivery-order-info';
import AuthContext from '../services/contexts/auth-context';
import { DeliveryContext } from '../services/contexts/app-context';


export const OrderInfoPage: FC = () => {
  const { isAdmin } = useContext(AuthContext);
  const deliveryMethods = useContext(DeliveryContext);
  const history = useHistory();

  const [dataContacts, setDataContacts] = useState<TContacts>({
    discount: 0,
    email: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
  });

  const [deliveryInfo, setDeliveryInfo] = useState<TDeliveryInfo>({
    city: '',
    location: '',
    postal_code: '',
    region: '',
    comment: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState<string>('');

  const match = useRouteMatch();
  const [order, setOrder] = useState<TOrderInfo | null>(null);
  const [change, setChange] = useState(false);
  const [statusName, setStatusName] = useState('');
  const [statuses, setStatuses] = useState<Array<TStatus | null>>([]);

  const [orderCart, setOrderCart] = useState<Array<TElementOrder>>([]);
  const [searchVisible, setSearchVisible] = useState(false);

  const id = useParams<{ id?: string }>().id;

  const getOrderById = (id: number) => {
    api
      .getOrderId(id)
      .then(res => {
        setOrder(res);
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

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

  useEffect(() => {
    getOrderById(Number(id));
    if (match.path === '/admin-panel/orders/:id' && isAdmin) {
      getStatuses()
    }
    if (match.path === '/admin-panel/orders/:id' && !isAdmin) {
      history.replace({ pathname: `/profile/orders/${id}` });
    }
  }, []);

  useEffect(() => {
    if (match.path === '/admin-panel/orders/:id' && isAdmin) {
      if (order) {
        setOrderCart(order.elements)
        const { discount, first_name, last_name, phoneNumber } = order;
        const email = order.email ? order.email : '';
        setDataContacts({
          discount,
          email,
          first_name,
          last_name,
          phoneNumber,
        });
        const city = order.city ? order.city : '';
        const location = order.location ? order.location : '';
        const postal_code = order.postal_code ? order.postal_code : '';
        const region = order.region ? order.region : '';
        const comment = order.comment ? order.comment : '';
        setDeliveryInfo({
          city,
          location,
          postal_code,
          region,
          comment
        })
        setDeliveryMethod(order.delivery?.company ? order.delivery.company : '');
      }
    }

  }, [order, change]);

  let dateTime;
  if (order) {
    const date = new Date(order.created);
    dateTime = showMessageDateTime(date, 'time');
  };

  const saveFile = (id: number) => {
    api 
      .downloadFile(id)
      // .then()
      .catch(err => {
        const errors = Object.values(err);
        if (errors) {
          alert(errors.join(', '));
        }
      })
  };

  const onClickButtonSave = () => {
    saveFile(Number(id));
  }

  const onChangeOrder = () => {
    setChange(true);
  }

  const onClickAddElement = () => {
    setSearchVisible(true)
  }

  const deliveryPriceChange = deliveryMethods?.filter(item => item.company === deliveryMethod)[0]?.price;
  
  const totalPriceChange = deliveryPriceChange +
    orderCart.reduce((
      acc: number,
      item: TElementOrder
    ) => acc + item.cur_price * item.amount, 0);

  const total = (
    <div className={'mt-10 ' + orderinfoStyles.total}>
      <div className={orderinfoStyles.price}>
        <p className='text text_type_digits-default pr-2'>
          Итого: {change ? priceFormat(totalPriceChange) : priceFormat(order?.order_sum)}
        </p>
      </div>
    </div>
  );

  const onClickCancel = () => {
    setChange(false)
  };

  const onChangeSave = () => {
    if (statusName === 'отменённый заказ') {
      api
        .cancelOrder(id)
        .then(res => {
          console.log(res);
          
        })
        .catch(err => console.log(err))
      return;
      
    }
    const status = statusName ? {
      id: statuses.filter(item => item!.status === statusName)[0]!.id
    } : order?.status;
    const delivery = {
      id: deliveryMethods.filter(item => item.company === deliveryMethod)[0].id
    };
    const { city, location, postal_code, region,comment} = deliveryInfo;
    const { discount, email, first_name, last_name,phoneNumber } = dataContacts;
    const elements = orderCart.map(({ element_id: id, amount}) => {
      return {
        id,
        amount
      }
    });
    const dataOrder = {
      status,
      delivery,
      comment,
      email,
      last_name,
      first_name,
      phoneNumber,
      postal_code,
      region,
      city,
      location,
      discount,
      elements
    };
    api
      .updateOrder(id, dataOrder)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={orderinfoStyles.container}>
      <h2>№ {order?.number}</h2>
      <h3>от {dateTime}</h3>
      {match.path === '/admin-panel/orders/:id'  && isAdmin && order?.status?.status !== 'отменённый заказ' && (
        <Button className={orderinfoStyles.button} clickHandler={onChangeOrder}>
          Редактировать заказ
        </Button>
      )} 
      <div className={orderinfoStyles.content}>
        <h4>Статус:</h4>
        {order && statuses && <Status 
          change={change}
          status={order?.status}
          statusName={statusName}
          setStatusName={setStatusName}
          statuses={statuses}
        />}
        <h4>Контактные данные:</h4>
        <Contacts
          change={change}
          order={order}
          contacts={dataContacts}
          setContacts={setDataContacts}
        />
        <h4>Детали заказа:</h4>
        <ul className={orderinfoStyles.ingredients}>
          {order && <ElementsCardOrder 
            change={change}
            elements={order.elements}
            orderCart={orderCart}
            setOrderCart={setOrderCart}
          />}
        </ul>
        <div>
          {change && (
            <Button className={orderinfoStyles.button} clickHandler={onClickAddElement}>
              Добавить элемент
            </Button>
          )}
          {searchVisible && (
            <ListElementsSearch
              setSearchVisible={setSearchVisible}
              orderCart={orderCart}
              setOrderCart={setOrderCart}
            />
          )}
        </div>
        <h4>Доставка:</h4>
        {order && <DeliveryOrderInfo
          change={change}
          order={order}
          deliveryInfo={deliveryInfo}
          setDeliveryInfo={setDeliveryInfo}
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
        />}
        {total}
        {!change && 
        <Button className={orderinfoStyles.button} clickHandler={onClickButtonSave}>
          Сохранить в Exel
        </Button>}
        {change && (
          <div className={orderinfoStyles.buttons}>
            <Button
              type='button'
              className={orderinfoStyles.button}
              clickHandler={onChangeSave}
            >
              Применить изменения
            </Button>
            <Button
              type='button'
              clickHandler={onClickCancel}
              className={orderinfoStyles.button}
            >
              Отменить изменения
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}