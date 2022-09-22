import * as React from 'react';
import { FC } from 'react';
import { TDataElement } from '../../services/types/data';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '../button/button';
import cardStyles from './card.module.css';

interface IElementProps {
  element: TDataElement;
};

const Element: FC<IElementProps> = ({ element }) => {

  const { title, price, article, images } = element;

console.log(element);

const onClickButton = () => {

};


  return (
    <li className={cardStyles.card}>
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
        {images.map(item => (
          <SwiperSlide>
            <img src={item.image} className={cardStyles.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div>
        {images.map(item => (
          <img src={item.image} className={cardStyles.image} />

        ))}
      </div> */}
      <div>
        <p>
          {title}
        </p>
        <h3>
          {price} руб.
        </h3>
        <Button clickHandler={onClickButton} className={cardStyles.button}>
          В корзину
        </Button>
      </div>
    </li>
  )
}

export default Element;