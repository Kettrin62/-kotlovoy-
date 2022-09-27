import * as React from 'react';
import { useContext } from 'react';
// import sliderStyles from './slider.module.css';
import './slider.css'
import { FC } from 'react';
import { DataSwiperContext } from '../../services/contexts/app-context';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Slider() {
  const swiperData = useContext(DataSwiperContext);
  const swiper = swiperData.filter(item => {
    return item.available === true
  });

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className='mySwiper'
    >
      {swiper.map(item => (
        <SwiperSlide key={item.id}>
          <div style={{ backgroundImage: `URL(${item.image})` }}>
            <a>
              <h2>
                {item.text}
              </h2>
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider;