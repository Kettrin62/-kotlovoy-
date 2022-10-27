import * as React from 'react';
import { useEffect, useState } from 'react';

import { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { FC } from 'react';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames';
import { TDataCartElement, TDataElement } from '../services/types/data';
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

  const getElement = (id: string) => {
    api
      .getElement(id)
      .then(data => setElement(data))
      .catch(err => console.log(err)
      )
  }

  useEffect(() => {
    if (id) getElement(id);
  }, []);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value;
    setInputValue(target);
  };

  const onClickButtonUp = () => {
    setInputValue(inputValue + 1);
  };

  const onClickButtonDown = () => {
    if (inputValue > 1) {
      setInputValue(inputValue + 0 - 1);
    } else setInputValue(1);
  };

  let arr: TDataCartElement[] = [];

  const onClickButtonCart = () => {
    arr = dataCart;
    if (element) {
      arr.push({
        element: element,
        qty: inputValue
      });
      setDataCart([...arr]);
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
                value={inputValue + ''}
                onChange={handleValueChange}
                onClickButtonUp={onClickButtonUp}
                onClickButtonDown={onClickButtonDown}
              />
              <Button clickHandler={onClickButtonCart} className={elementStyles.button}>
                Купить
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
