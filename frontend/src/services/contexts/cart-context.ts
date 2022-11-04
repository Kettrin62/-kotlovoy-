import React, { Dispatch } from 'react';
import { formDeliveryInit, totalInitialPrice } from '../../utils/data';
import { TAction, TDataCartElement, TDeliveryForm, TDeliveryMethod, TTotalPrice } from '../types/data';

interface ICartStepContext {
  step: string;
  setStep: (step: string) => void;
}

interface IselectedDelivery {
  selectedDeliveryId: number;
  setSelectedDeliveryId: (id: number) => void;
}

interface ITotalPriceContext {
  totalPrice: TTotalPrice;
  totalDispatcher: Dispatch<TAction>;
}

interface IDeliveryContext {
  deliveryMethods: Array<TDeliveryMethod>;
  setDeliveryMethods: (methods: Array<TDeliveryMethod>) => void;
}

interface IDeliveryFormContext {
  form: TDeliveryForm;
  setForm: (form: TDeliveryForm) => void;
}

export const CartStepContext = React.createContext<ICartStepContext>({
  step: '',
  setStep: () => {},
});

export const TotalPriceContext = React.createContext<ITotalPriceContext>({
  totalPrice: totalInitialPrice,
  totalDispatcher: () => {},
});



export const SelectedDeliveryContext = React.createContext<IselectedDelivery>({
  selectedDeliveryId: 1,
  setSelectedDeliveryId: () => {},
});

export const DeliveryFormContext = React.createContext<IDeliveryFormContext>({
  form: formDeliveryInit,
  setForm: () => {},
})
