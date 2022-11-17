import { FC, useCallback, forwardRef } from 'react';
import { 
  Link,
  useHistory,
  useLocation
} from 'react-router-dom';
import { TCardOrder, TRef } from '../../services/types/data';
import { showMessageDateTime } from '../../utils/functions';
import { priceFormat } from '../total-price/utils';
import cardorderStyles from './card-order.module.css';
import cn from 'classnames';

type TCardOrderProps = {
  card: TCardOrder;
};

const CardOrder = forwardRef<TRef, TCardOrderProps>(({ card }, ref) => {

  const { id, created, number, order_sum: totalPrice, status } = card;
  const date = showMessageDateTime(new Date(created), 'date');
  const history = useHistory();
  const pathname = useLocation().pathname

  const onClickOrder = useCallback(
    () => {
      if (pathname === '/profile/orders') history.push({ pathname: `/profile/orders/${id}` });
      if (pathname === '/admin-panel/orders') history.push({ pathname: `/admin-panel/orders/${id}` });
    },
    [history]
  );

  const statusName = status?.status ? status?.status : 'не указан'

  return (
    <li
      className={cardorderStyles.card}
      onClick={onClickOrder}
      ref={ref}
    >
      <h4 className={cardorderStyles.header}>
        <span>{`№ ${number}`}</span>
        <span>
          {`от ${date}`}
        </span>
      </h4>
      <p className={cardorderStyles.text}>
        <span>Статус:</span>
        <span>
          {statusName}
        </span>
      </p>
      <p className={cn(cardorderStyles.text, cardorderStyles.price)}>
        <span>Сумма:</span>
        <span>
          {priceFormat(totalPrice)}
        </span>
      </p>
    </li>
  )
})

export default CardOrder;