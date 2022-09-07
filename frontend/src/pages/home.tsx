import * as React from 'react';
import BrandList from '../components/brand-list/brand-list';
import Slider from '../components/slider/slider';
import homeStyles from './home.module.css';

export function HomePage() {
  return (
    <main className={homeStyles.main}>
      <Slider />
      <BrandList />
    </main>
  )
}