import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api';
import { TCardOrder } from '../../services/types/data';
import InputSearch from '../input-add-element/input-search';
import styles from './order-search.module.css';

const OrdersSearch = () => {
  const { pathname } = useLocation();
  const [ elements, setElements ] = useState<Array<TCardOrder>>([])
  const [ showOrders, setShowOrders ] = useState(false);

  interface IOrder {
    id: number | null;
    number: string;
  }

  const [nameOrder, setNameOrder] = useState<IOrder>({
    id: null,
    number: ''
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameOrder({
      ...nameOrder,
      number: value
    })
  };
  const onClickClose = () => {
    setNameOrder({
      ...nameOrder,
      number: '',
    });
  };

  useEffect(() => {
    if (nameOrder.number === '') {
      return setElements([])
    }
    api
      .getOrdersSearch(nameOrder.number)
      .then(res => {
        setElements(res.results)
      })
  }, [nameOrder.number]);

  const placeholder = pathname === '/admin-panel/orders' ? '№ заказа, email или телефон' : '№ заказа';


  return (
    <>
      <p className={styles.title}>Найти заказ</p>
      <InputSearch
        inputValue={nameOrder.number}
        onChangeInput={onChangeInput}
        onClickClose={onClickClose}
        onFocus={() => {
          setShowOrders(true)
        }}
        placeholder={placeholder}
      />
      {showOrders && elements.length > 0 && 
        <ul className={styles.container}>
          {elements.map(element => (
            <li key={element.id}>
              <Link to={
                pathname === '/admin-panel/orders' 
                  ? `/admin-panel/orders/${element.id}`
                  : `/profile/orders/${element.id}`
              }>
                № {element.number} {pathname === '/admin-panel/orders' 
                  && element.email} {pathname === '/admin-panel/orders' 
                  && element.phoneNumber}
              </Link>
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default OrdersSearch;