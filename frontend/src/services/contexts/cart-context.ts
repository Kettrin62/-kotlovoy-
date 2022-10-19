import React, { Dispatch } from 'react';
import { totalInitialPrice } from '../../utils/data';
import { TAction, TDataCartElement, TTotalPrice } from '../types/data';

interface ICartStepContext {
  step: string;
  setStep: (step: string) => void;
}

interface ITotalPriceContext {
  totalPrice: TTotalPrice;
  totalDispatcher: Dispatch<TAction>;
}

export const CartStepContext = React.createContext<ICartStepContext>({
  step: '',
  setStep: () => {},
});

export const TotalPriceContext = React.createContext<ITotalPriceContext>({
  totalPrice: totalInitialPrice,
  totalDispatcher: () => {},
});
