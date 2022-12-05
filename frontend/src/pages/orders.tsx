import { 
  FC, 
  useEffect, 
  useState, 
  useRef, 
  createRef 
} from 'react';
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
import { Loader } from '../ui/loader/loader';

interface IOrdersPage {
  statuses?: Array<TStatus>;
}

interface IData {
  orders: Array<TCardOrder>;
  page: number;
  selectStatus: number;
}

export const OrdersPage: FC<IOrdersPage> = ({ statuses }) => {
  const [ordersData, setOrdersData] = useState<IData>({
    orders: [],
    page: 1,
    selectStatus: 0
  });
  const [ ordersRequest, setOrdersRequest] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const getOrders = (page = 1) => {
    api
      .getOrders({
        page,
        limit
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setOrdersData({
            orders: [...results],
            page: page + 1,
            selectStatus: 0
          })
        } else {
          setOrdersData({
            orders: [...ordersData.orders, ...results],
            page: page + 1,
            selectStatus: 0
          })
        }
        setOrdersRequest(false);
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
        setOrdersRequest(false);
      })
  };

  const getOrdersStatus = (name: number, page = 1) => {
    api
    .getOrdersStatus({
      name,
      page,
      limit
    })
    .then(data => {
      const { results, count } = data;
      setTotalCount(count);
      if (page === 1) {
        setOrdersData({
          orders: [...results],
          page: page + 1,
          selectStatus: name
        })
      } else {
        setOrdersData({
          orders: [...ordersData.orders, ...results],
          page: page + 1,
          selectStatus: name
        })
      }
    })
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

  const lastItem = createRef<HTMLLIElement>();
  const observerLoader = useRef<IntersectionObserver | null>();
  const actionInSight = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && ordersData.orders.length < totalCount) {
      if (ordersData.selectStatus === 0) {
        getOrders(ordersData.page)
      } else {
        getOrdersStatus(ordersData.selectStatus, ordersData.page)
      }
    }
  };

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem])

  const onClickHandler = (idStatus: number) => {
    if (ordersData.selectStatus !== idStatus) {
      getOrdersStatus(idStatus)
    } else {
      getOrders()
    }
  }

  const filter = statuses && (
    <ul className={cn(filterStyles.list_group, filterStyles.show, ordersStyles.filter)}>
      {statuses.map(item => {
        const classActive = ordersData.selectStatus === item?.id ? filterStyles.button_group_active : '';
        return (
          <li key={item!.id} className={ordersStyles.box}>
            <Button clickHandler={() => {onClickHandler(item!.id)}} className={cn(filterStyles.button_group, classActive)}>
              <Text text={item!.status} class={filterStyles.text_group} />
              {ordersData.selectStatus === item?.id && <LinkClose />}
            </Button>
          </li>
        )
      })}
    </ul>
  )

  if (ordersRequest) {
    return <Loader size='large' />
  }

  return (
    <div className={ordersStyles.container}>
      <OrdersSearch />
      {filter}
      <ul className={ordersStyles.list}>
        {ordersData.orders.map((item, index) => {
          if (index + 1 === ordersData.orders.length) {
            return <CardOrder key={item.id} card={item} ref={lastItem} />
          }
          return <CardOrder key={item.id} card={item} />
        })}
      </ul>
    </div>
  );
}
