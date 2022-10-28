import { useState, useMemo, useReducer, useContext, useEffect } from 'react';
import api from '../api';
import Cart from '../components/cart/cart';
import { Checkout } from '../components/checkout/checkout';
import Delivery from '../components/delivery/delivery';
import { TotalPrice } from '../components/total-price/total-price';
import { 
  CartStepContext, 
  DeliveryContext, 
  DeliveryFormContext, 
  SelectedDeliveryContext, 
  TotalPriceContext 
} from '../services/contexts/cart-context';
import { TAction, TDataCartElement, TDeliveryForm, TDeliveryMethod, TTotalPrice } from '../services/types/data';
import { TitleCart } from '../ui/title-cart/title-cart';
import { stepName, titleCart, totalInitialPrice } from '../utils/data';
import cartStyles from './cart.module.css';


// function reducer(_totalPrice: TTotalPrice, action: TAction) {
//   const deliveryPrice =
//     (action.delivery?.selectedMethod &&
//       action.delivery?.methods.
//       find(method => method.id === action.delivery?.selectedMethod)?.price) || 
//     0;

//   const total = deliveryPrice +
//     action.array.reduce((
//       acc: number, 
//       item: TDataCartElement
//     ) => acc + item.element.cur_price * item.qty, 0);

//   return { price: total };
// }

export function CartPage() {
  // const [step, setStep] = useState(stepName.cart);
  // const [totalPrice, totalDispatcher] = useReducer(reducer, totalInitialPrice);
  const { step, setStep } = useContext(CartStepContext);

  const [deliveryMethods, setDeliveryMethods] = useState<Array<TDeliveryMethod>>([]);
  // const [selectedDeliveryId, setSelectedDeliveryId] = useState<number>(1);
  // const [form, setForm] = useState<TDeliveryForm | null>(null);

  const getMethodsDelivery = () => {
    api
      .getDeliveryMethods()
      .then(data =>{
        setDeliveryMethods(data)
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getMethodsDelivery();
    if(step === '') setStep(stepName.cart);
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
      {/* <CartStepContext.Provider value={{ step, setStep }}> */}
        {/* <TotalPriceContext.Provider value={{ totalPrice, totalDispatcher }}> */}
          <DeliveryContext.Provider value={deliveryMethods}>
            {/* <SelectedDeliveryContext.Provider value={{ selectedDeliveryId, setSelectedDeliveryId }}> */}
              {/* <DeliveryFormContext.Provider value={{ form, setForm }}> */}
                <TitleCart
                  text={titleCart.cart}
                  currentStep={Object.keys(titleCart).indexOf(step) + 1}
                  allSteps={Object.keys(titleCart).length}
                />
                {content}
                <TotalPrice />
              {/* </DeliveryFormContext.Provider> */}
            {/* </SelectedDeliveryContext.Provider> */}
          </DeliveryContext.Provider>
        {/* </TotalPriceContext.Provider> */}
      {/* </CartStepContext.Provider> */}
    </div>
  )
}