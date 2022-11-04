import { useState, useMemo, useContext, useEffect } from 'react';
import api from '../api';
import Cart from '../components/cart/cart';
import { Checkout } from '../components/checkout/checkout';
import Delivery from '../components/delivery/delivery';
import { TotalPrice } from '../components/total-price/total-price';
import { 
  CartStepContext
} from '../services/contexts/cart-context';
import { TDeliveryMethod } from '../services/types/data';
import { TitleCart } from '../ui/title-cart/title-cart';
import { stepName, titleCart } from '../utils/data';
import cartStyles from './cart.module.css';


export function CartPage() {
  const { step, setStep } = useContext(CartStepContext);

  useEffect(() => {
    if (step === '') setStep(stepName.cart);
  }, []);
  

  const content = useMemo(
    () => {
      switch (step) {
        case stepName.cart: {
          return <Cart />;
        }
        case stepName.delivery: {
          return <Delivery />;
        }
        case 'checkout': {
          return <Checkout />;
        }
        default: {
          return <Cart />;
        }
      }
    },
    [step]
  );

  return (
    <div className={cartStyles.container}>
      <TitleCart
        text={titleCart.cart}
        currentStep={Object.keys(titleCart).indexOf(step) + 1}
        allSteps={Object.keys(titleCart).length}
      />
      {content}
      <TotalPrice />
    </div>
  )
}