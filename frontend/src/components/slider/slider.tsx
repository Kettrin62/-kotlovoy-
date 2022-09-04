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

interface IBrandListProps {
  children: React.ReactNode
}

function Slider() {
  const swiper = useContext(DataSwiperContext);
  console.log(swiper);


  // brands.forEach(item => {
  //   console.log(item);
    
  // })
  
  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
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
          <img src={item.image} />
          <h2>
            {item.title}
          </h2>
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
    </Swiper>
  )
}

export default Slider;