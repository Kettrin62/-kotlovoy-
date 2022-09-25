import * as React from 'react';
import { useCallback } from 'react';
import { 
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { FC } from 'react';
import { TDataElement } from '../../services/types/data';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '../button/button';
import cardStyles from './card.module.css';
import cn from 'classnames';

interface ICardProps {
  element: TDataElement;
};

const Card: FC<ICardProps> = ({ element }) => {
  const { 
    id,
    title, 
    cur_price, 
    article, 
    images,
    stock
  } = element;
  const history = useHistory();
  


const onClickButton = useCallback(
  () => {
    history.replace({ pathname: `/elements/${id}` });
  },
  [history]
);


  return (
    <li className={cardStyles.card} onClick={onClickButton}>
      <img src={images[0].image} alt={title} className={cardStyles.image} />
      <div className={cardStyles.container}>
        <p className={cardStyles.title}>
          {title}
        </p>
        <div className={cardStyles.box}>
          <p className={cardStyles.text}>
            Арт:&nbsp;{article}
          </p>
          <h3 className={cardStyles.price}>
            {cur_price}&nbsp;руб.
          </h3>
        </div>
        <div className={cardStyles.box}>
          <p className={cardStyles.text}>
            Доступно: {stock}11шт.
          </p>
          <Button clickHandler={onClickButton} className={cardStyles.button}>
            В&nbsp;корзину
          </Button>
        </div>
      </div>
    </li>
  )
}

export default Card;