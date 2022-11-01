import { FC, useCallback } from 'react';
import { 
  Link,
  useHistory,
} from 'react-router-dom';
import { TCardOrder } from '../../services/types/data';
import { showMessageDateTime } from '../../utils/functions';
import Divider from '../divider/divider';
import { priceFormat } from '../total-price/utils';
import cardorderStyles from './card-order.module.css';

interface ICardOrderProps {
  card: TCardOrder;
}

const CardOrder: FC<ICardOrderProps> = ({ card }) => {

  const { id, created, number, order_sum: totalPrice, status } = card;
  const date = showMessageDateTime(new Date(created), 'date');
  const history = useHistory();

  const onClickOrder = useCallback(
    () => {
      history.replace({ pathname: `/profile/orders/${id}` });
    },
    [history]
  );

  return (
    <li
        className={cardorderStyles.card}
        onClick={onClickOrder}
      >
        {/* <Link to={`/profile/orders/${id}`}> */}

        <h4 className={cardorderStyles.header}>
          {`№ ${number} от ${date}`}
        </h4>
        <p>
          {`Статус: ${status.status}`}
        </p>
        <p>
          {`Сумма: ${priceFormat(totalPrice)}`}
        </p>
        {/* <Divider className={cardorderStyles.divider} /> */}

        {/* <h2 className='mt-6 text text_type_main-medium'>{name}</h2>
        {(pathname === '/profile/orders') && 
        (<p className='mt-2 text text_type_main-default' style={{color}}>{status}</p>)} */}
        {/* <div className={'mt-6 ' + cardorderStyles.main}>

          <div className={'ml-6 ' + cardorderStyles.price}>
            <p className='text text_type_digits-default'>{totalPrice}</p>
          </div>
        </div> */}
                {/* </Link> */}
      </li>
  )
}

export default CardOrder;