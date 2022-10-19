import { useState, useMemo, useReducer } from 'react';
import Cart from '../components/cart/cart';
import Delivery from '../components/delivery/delivery';
import { TotalPrice } from '../components/total-price/total-price';
import { CartStepContext, TotalPriceContext } from '../services/contexts/cart-context';
import { TAction, TDataCartElement, TTotalPrice } from '../services/types/data';
import { TitleCart } from '../ui/title-cart/title-cart';
import { stepName, titleCart, totalInitialPrice } from '../utils/data';
import cartStyles from './cart.module.css';


function reducer(_totalPrice: TTotalPrice, action: TAction) {
  const total = 
    action.array.reduce((
      acc: number, 
      item: TDataCartElement
    ) => acc + item.element.cur_price * item.qty, 0);
  return { price: total };
}

export function CartPage() {
  const [step, setStep] = useState(stepName.cart);
  const [totalPrice, totalDispatcher] = useReducer(reducer, totalInitialPrice);

  const content = useMemo(
    () => {
      switch (step) {
        case 'cart': {
          return <Cart />;
        }
        case 'delivery': {
          return <Delivery />;
        }
        case 'checkout': {
          // return <Checkout />;
          return <div></div>;
        }
        default: {
          // return <Cart />;
          return <div></div>;
        }
      }
    },
    [step]
  );

  return (
    <div className={cartStyles.container}>
      <CartStepContext.Provider value={{ step, setStep }}>
        <TotalPriceContext.Provider value={{ totalPrice, totalDispatcher }}>
          <TitleCart
            text={titleCart.cart}
            currentStep={Object.keys(titleCart).indexOf(step) + 1}
            allSteps={Object.keys(titleCart).length}
          />
          {content}
          <TotalPrice step={step} />
        </TotalPriceContext.Provider>
      </CartStepContext.Provider>
    </div>
  )
}