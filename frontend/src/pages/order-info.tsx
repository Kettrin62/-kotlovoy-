import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouteMatch, useLocation } from 'react-router-dom';
import api from '../api';
import Button from '../components/button/button';
import { priceFormat } from '../components/total-price/utils';
import { TCardOrder, TContacts, TDataCartElement, TDataElement, TDeliveryForm, TDeliveryInfo, TDeliveryMethod, TElementOrder, TOrderInfo, TStatus, TUser } from '../services/types/data';
import { showMessageDateTime } from '../utils/functions';
import orderinfoStyles from './order-info.module.css';
import DropDownIcon from '../images/drop-down.svg';
import cn from 'classnames';
import Form from '../components/form/form';
import InputEdit from '../ui/input-edit/input-edit';
import Input from '../ui/input/input';
import { AmountButton } from '../ui/amount-button/amount-button';
import { DeleteButton } from '../ui/delete-button/delete-button';
import SearchBar from '../components/search-bar/search-bar';
import InputAddElement from '../components/input-add-element/input-search';
import ElementsSearch from '../components/elements-search/elements-search';
import InputsBox from '../components/inputs-box/inputs-box';
import Status from '../components/status/status';
import Contacts from '../components/contacts/contacts';
import ElementsCardOrder from '../components/elements-card-order/elements-card-orders';
import ListElementsSearch from '../components/list-elements-search/list-elements-search';
import DeliveryOrderInfo from '../components/delivery-order-info/delivery-order-info';


export function OrderInfoPage() {

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

  const [deliveryMethods, setDeliveryMethods] = useState<Array<TDeliveryMethod>>([]);
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

  const getMethodsDelivery = () => {
    api
      .getDeliveryMethods()
      .then(data =>{
        setDeliveryMethods(data)
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getOrderById(Number(id));
    if (match.path === '/admin-panel/orders/:id') {
      getStatuses();
      getMethodsDelivery();
    }
  }, []);

  useEffect(() => {
    if (match.path === '/admin-panel/orders/:id') {
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
        setDeliveryMethod(order.delivery.company);
      }
    }

  }, [order, change]);

  let dateTime;
  if (order) {
    const date = new Date(order.created);
    dateTime = showMessageDateTime(date, 'time');
  };

  const index = order?.postal_code ? order?.postal_code + ',' : '';
  const region = order?.region ? order?.region + ',' : '';
  const city = order?.city ? order?.city + ',' : '';
  const location = order?.location ? order?.location : '';

  const address = `${index} ${region} ${city} ${location}`;

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
    const status = {
      id: statuses.filter(item => item!.status === statusName)[0]!.id
    }
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

  console.log(order);
  


  return (
    <div className={orderinfoStyles.container}>
      <h2>№ {order?.number}</h2>
      <h3>от {dateTime}</h3>
      {match.path === '/admin-panel/orders/:id' && (
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
              // elementValue={elementValue}
              // setElementValue={setElementValue}
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
          deliveryMethods={deliveryMethods}
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