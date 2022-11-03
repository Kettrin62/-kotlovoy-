import { FC, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../api';
import { TCardOrder } from '../../services/types/data';
import InputSearch from '../input-add-element/input-search';
import styles from './order-search.module.css';

interface IOrdersSearchProps {
  orders: Array<TCardOrder>
}

const OrdersSearch: FC<IOrdersSearchProps> = ({ orders }) => {
  // const [ orders, setOrders ] = useState([]);
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


  return (
    <>
      <p>Найти заказ</p>
      <InputSearch
        inputValue={nameOrder.number}
        onChangeInput={onChangeInput}
        onClickClose={onClickClose}
        onFocus={() => {
          setShowOrders(true)
        }}
      />
      {showOrders && elements.length > 0 && 
        <ul className={styles.container}>
          {elements.map(element => (
            <li key={element.id}>
              <Link to={`/admin-panel/orders/${element.id}`}>
                № {element.number}
              </Link>
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default OrdersSearch;