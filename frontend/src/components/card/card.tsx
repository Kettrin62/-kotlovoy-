import * as React from 'react';
import { useCallback, useContext, useState, useEffect, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { TButtonState, TDataElement, TRef } from '../../services/types/data';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '../button/button';
import cardStyles from './card.module.css';
import cn from 'classnames';
import { DataCartContext } from '../../services/contexts/app-context';

type TCardProps = {
  element: TDataElement;
};

const Card = forwardRef<TRef, TCardProps>(({ element }, ref) => {
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
    history.push({ pathname: `/elements/${id}` })
  },
  [history]
);

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
    if(dataCart.some((el) => el.element === id)) {
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
    dataCart.push({
      element: element.id,
      amount: 1
    });
    setDataCart([...dataCart]);
  } 
  if (buttonState.text === 'Оформить') {
    history.push({ pathname: '/cart' });
  }
};

  return (
    <li className={cardStyles.card} ref={ref}>
      <img src={images.length > 0 ? images[0].image : ''} alt={title} className={cardStyles.image} onClick={onClickButton} />
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
})

export default Card;
