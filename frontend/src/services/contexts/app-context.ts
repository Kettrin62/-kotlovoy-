import React from 'react';
import { 
  TDataBrand, 
  TDataCartElement, 
  TDataElement, 
  TDataSwiper
} from '../types/data';

interface IDataCartContext {
  dataCart: Array<TDataCartElement>,
  setDataCart: (data: Array<TDataCartElement>) => void,
}

interface ICartStepContext {
  step: string;
  setStep: (step: string) => void;
}

export const DataBrandsContext = React.createContext<Array<TDataBrand>>([]);
export const DataSwiperContext = React.createContext<Array<TDataSwiper>>([]);

export const DataCartContext = React.createContext<IDataCartContext>({
  dataCart: [],
  setDataCart: () => {},
});

export const CartStepContext = React.createContext<ICartStepContext>({
  step: '',
  setStep: () => {},
});
