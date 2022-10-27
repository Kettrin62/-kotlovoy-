import * as React from 'react';
import { useCallback, useContext, useState, useEffect } from 'react';
import { 
  useHistory,
} from 'react-router-dom';
import { FC } from 'react';
import { TButtonState, TDataCartElement, TDataElement } from '../../services/types/data';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '../button/button';
import cardStyles from './card.module.css';
import cn from 'classnames';
import { DataCartContext } from '../../services/contexts/app-context';

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

  const { dataCart, setDataCart } = useContext(DataCartContext);

  const [buttonState, setButtonState] = useState<TButtonState>({
    text: '',
    class: '',
    disabled: false,
  })

const onClickButton = useCallback(
  () => {
    history.replace({ pathname: `/elements/${id}` });
  },
  [history]
);

let arr: TDataCartElement[] = [];

useEffect(() => {
  if (stock === 0) {
    setButtonState({
      ...buttonState,
      text: 'В корзину',
      disabled: true,
    })
  }
}, []);

useEffect(() => {
  if (stock !== 0) {
    if(dataCart.some((el) => el.element.id === id)) {
      setButtonState({
        ...buttonState,
        text: 'Оформить',
        class: cardStyles.button_active,
      })
    } else setButtonState({
      ...buttonState,
      text: 'В корзину',
    })
  }
}, [dataCart]);

const onClickButtonCart = () => {
  if (buttonState.text === 'В корзину') {
    arr = dataCart;
    arr.push({
      element: element,
      qty: 1
    });
    setDataCart([...arr]);
  } 
  if (buttonState.text === 'Оформить') {
    history.replace({ pathname: '/cart' });
  }
};

  return (
    <li className={cardStyles.card}>
      <img src={images[0].image} alt={title} className={cardStyles.image} onClick={onClickButton} />
      <div className={cardStyles.container}>
        <p className={cardStyles.title} onClick={onClickButton}>
          {title}
        </p>
        <div className={cardStyles.box} onClick={onClickButton}>
          <p className={cn(cardStyles.text, cardStyles.article)}>
            Арт:&nbsp;{article}
          </p>
          <h3 className={cardStyles.price}>
            {cur_price}&nbsp;руб.
          </h3>
        </div>
        <div className={cardStyles.box}>
          <p className={cardStyles.text} onClick={onClickButton}>
            Доступно: {stock}шт.
          </p>
          <Button 
            clickHandler={onClickButtonCart} 
            className={cn(cardStyles.button, buttonState.class)} 
            disabled={buttonState.disabled}
          >
            {buttonState.text}
          </Button>
        </div>
      </div>
    </li>
  )
}

export default Card;
