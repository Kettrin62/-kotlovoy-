import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import api from '../api';
import Button from '../components/button/button';
import { priceFormat } from '../components/total-price/utils';
import { TCardOrder, TDataCartElement, TOrderInfo } from '../services/types/data';
import { showMessageDateTime } from '../utils/functions';
import orderinfoStyles from './order-info.module.css';


export function OrderInfoPage() {
  // const { ingredients } = useSelector(state => state.ingredients);
  // const { orders, ordersUser } = useSelector(state => state.ws);
  const match = useRouteMatch();
  const [order, setOrder] = useState<TOrderInfo | null>(null);
  
  
  // const dispatch = useDispatch();

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

  useEffect(() => {
    getOrderById(Number(id))
  }, []);




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
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  const onClickButton = () => {
    saveFile(Number(id))
  }


  const elementsCardOrder = order?.elements.map(item => {
    const { amount, element_image: image, element_title: title, cur_price, element_id: id } = item;
    return (
      <li className={orderinfoStyles.product} key={id}>
        <div className={orderinfoStyles.leftbox}>
        <img className={orderinfoStyles.img} src={image} alt={title} />
        <p className={orderinfoStyles.text}>{title}</p>
      </div>
      <p className={orderinfoStyles.count}>×{amount}</p>
      <div className={orderinfoStyles.price}>
        <p className={orderinfoStyles.price} data-testid={`price-amount-${id}`}>
          {priceFormat(cur_price * amount)}
        </p>
      </div>
      </li>
    )
  })

  return (
    <div className={orderinfoStyles.container}>
      <h2>№ {order?.number}</h2>
      <div className={orderinfoStyles.content}>
        <p className={'text text_type_main-default ' + orderinfoStyles.text}>
          Статус: {order?.status.status}
        </p>
        <div>
          <h4>
            Контактные данные:
          </h4>
          <p>
            Имя: {order?.first_name}
          </p>
          <p>
            Фамилия: {order?.last_name}
          </p>
          <p>
            Телефон: {order?.phoneNumber}
          </p>
          {order?.email && (<p>
            E-mail: {order?.email}
          </p>)}
        </div>
        <ul className={orderinfoStyles.ingredients}>
          {elementsCardOrder}
        </ul>
        <div>
          <h4>Доставка:</h4>
          <p>Адрес: {address}</p>
          <p>
            {order?.delivery.company}
          </p>
          <p>
            Стоимость доставки: {priceFormat(order?.delivery.price)}
          </p>
        </div>
        <div className={'mt-10 ' + orderinfoStyles.total}>
          <span className='text text_type_main-default text_color_inactive'>
            {dateTime}
          </span>
          <div className={orderinfoStyles.price}>
            <p className='text text_type_digits-default pr-2'>
              Итого: {priceFormat(order?.order_sum)}
            </p>
          </div>
        </div>
        <Button className={orderinfoStyles.button} clickHandler={onClickButton}>
          Сохранить в Exel
        </Button>
      </div>
    </div>
  )
}