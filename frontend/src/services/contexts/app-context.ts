import React from 'react';
import { 
  TDataBrand, 
  TDataCartElement, 
  TDataSwiper,
  TDeliveryMethod
} from '../types/data';

interface IDataCartContext {
  dataCart: Array<TDataCartElement<number>>,
  setDataCart: (data: Array<TDataCartElement<number>>) => void,
}

export const DataBrandsContext = React.createContext<Array<TDataBrand>>([]);
export const DataSwiperContext = React.createContext<Array<TDataSwiper>>([]);

export const DataCartContext = React.createContext<IDataCartContext>({
  dataCart: [],
  setDataCart: () => {},
});

export const DeliveryContext = React.createContext<Array<TDeliveryMethod>>([]);
