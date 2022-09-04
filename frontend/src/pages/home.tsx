import * as React from 'react';
import BrandList from '../components/brand-list/brand-list';
import Swiper from '../components/slider/slider';

export function HomePage() {
  return (
    <main>
      <Swiper />
      <BrandList />
    </main>
  )
}