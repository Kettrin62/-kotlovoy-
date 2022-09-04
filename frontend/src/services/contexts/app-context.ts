import React from 'react';
import { TDataBrands, TDataSwiper } from '../types/data';

export const DataBrandsContext = React.createContext<Array<TDataBrands>>([]);
export const DataSwiperContext = React.createContext<Array<TDataSwiper>>([]);