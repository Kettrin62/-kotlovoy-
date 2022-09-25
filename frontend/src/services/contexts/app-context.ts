import React from 'react';
import { 
  TDataBrand, 
  TDataSwiper
} from '../types/data';

export const DataBrandsContext = React.createContext<Array<TDataBrand>>([]);
export const DataSwiperContext = React.createContext<Array<TDataSwiper>>([]);
