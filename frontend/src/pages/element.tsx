import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import { useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { FC } from 'react';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames';
import { TButtonState, TDataCartElement, TDataElement } from '../services/types/data';
import api from '../api';
import Text from '../components/text/text';
import elementStyles from './element.module.css';
import Button from '../components/button/button';
import Image from '../components/image/image';
import InputBox from '../components/input-box/input-box';
import Divider from '../components/divider/divider';
import { DataCartContext } from '../services/contexts/app-context';



export function ElementPage() {
  
  const id = useParams<{ id?: string }>().id;
  const [element, setElement] = useState<TDataElement>();
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const [ inputValue, setInputValue ] = useState(1);
  const [buttonState, setButtonState] = useState<TButtonState>({
    text: '',
    class: '',
    disabled: false,
  });
  const [reset, setReset] = useState(false);

  const history = useHistory();

  const inputRef = useRef(null);

  const getElement = (id: string) => {
    api
      .getElement(id)
      .then(data => setElement(data))
      .catch(err => console.log(err)
      )
  }

  useEffect(() => {
    if (id) getElement(id);

    if (element && element.stock !== 0) {
      setButtonState({
        ...buttonState,
        text: 'В корзину',
      })
    } else {
      setButtonState({
        ...buttonState,
        text: 'В корзину',
        disabled: true,
      })
    }
  }, []);

  useEffect(() => {
    if (element?.stock !== 0) {
      if(dataCart.some((el) => `${el.element.id}` === id)) {
        setButtonState({
          ...buttonState,
          text: 'Оформить',
          class: elementStyles.button_active,
        })
        const qty = dataCart.find((el) => `${el.element.id}` === id)!.amount;
        setInputValue(qty);
      } else setButtonState({
        ...buttonState,
        text: 'В корзину',
      })
    }

    if (reset) setInputValue(1)
  }, [dataCart, reset]);

  // useEffect(() => {
  //   setInputValue(1);
  // }, [reset])

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value.replace(/\D/g, '');
    if (target === 0) {
      setInputValue(1);
    } else if (target > element!.stock) {
      setInputValue(element!.stock)
    } else setInputValue(target)
  };

  const onClickButtonUp = () => {
    if (inputValue < element!.stock) {
      setInputValue(inputValue + 1)
    } else setInputValue(element!.stock)
  };

  const onClickButtonDown = () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1)
    } else setInputValue(1)
  };

  let arr: TDataCartElement[] = [];

  const onClickButtonCart = () => {
    if (buttonState.text === 'В корзину') {
      arr = dataCart;
      if (element) {
        arr.push({
          element: element,
          amount: inputValue
        });
        setDataCart([...arr]);
      }
    } 
    if (buttonState.text === 'Оформить') {
      history.replace({ pathname: '/cart' });
    }
  };

  return (
    <div className={elementStyles.element}>
      {element && 
        <div className={elementStyles.container}>
          <h2 className={elementStyles.title}>{element?.title}</h2>
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            {element.images.map(item => (
              <SwiperSlide key={item.id}>
                <img src={item.image} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={elementStyles.box}>
            <Text 
              class={cn(elementStyles.text, elementStyles.article)}
              text={`Артикул: ${element.article}`}
            />
            <Divider className={elementStyles.divider} />
            <div className={elementStyles.box_price}>
              <Text class={elementStyles.text} text='Цена:' />
              <Text class={cn(elementStyles.text, elementStyles.text_bold)} text={`${element.cur_price} руб.`} />
            </div>
            <div className={elementStyles.input}>
              <InputBox  
                className=''
                value={String(inputValue)}
                onChange={handleValueChange}
                onClickButtonUp={onClickButtonUp}
                onClickButtonDown={onClickButtonDown}
                reset={reset}
                inputRef={inputRef}
              />
              <Button 
                clickHandler={onClickButtonCart} 
                className={cn(elementStyles.button, buttonState.class)}
                disabled={buttonState.disabled}
              >
                {buttonState.text}
              </Button>
            </div>

            <Text 
              class={cn(elementStyles.text, elementStyles.stock)}
              text={`В наличии ${element.stock} ${element.measurement_unit}`} 
            />
            <Divider className={elementStyles.divider} />
            <Text class={cn(elementStyles.text, elementStyles.description)} text={element.description} />
          </div>
        </div>
      }
    </div>
  )
}
