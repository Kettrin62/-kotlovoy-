import { useState, useMemo, useContext, useEffect } from 'react';
import api from '../api';
import Cart from '../components/cart/cart';
import { Checkout } from '../components/checkout/checkout';
import Delivery from '../components/delivery/delivery';
import { TotalPrice } from '../components/total-price/total-price';
import { DataCartContext } from '../services/contexts/app-context';
import { 
  CartStepContext
} from '../services/contexts/cart-context';
import { TDataCartElement, TDataElement, TDeliveryMethod } from '../services/types/data';
import { TitleCart } from '../ui/title-cart/title-cart';
import { stepName, titleCart } from '../utils/data';
import cartStyles from './cart.module.css';


export function CartPage() {
  const { step, setStep } = useContext(CartStepContext);
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const [dataCartElements, setDataCartElements] = useState<Array<TDataCartElement<TDataElement>>>([])
  const [element, setElement] = useState<TDataElement>();


  const getElement = async (id: string, amount: number) => {
    await api
      .getElement(id)
      .then(data => {
        const el = dataCartElements.find(el => el.element.id === data.id);
        if (!el) {
          dataCartElements.push({
            element: data,
            amount: amount
          });
          setDataCartElements([...dataCartElements])
        } else {
          const notEl = dataCartElements.filter(item => !dataCart.find(el => el.element === item.element.id))[0]?.element.id;
          if (notEl) {
            setDataCartElements(dataCartElements.filter(el => el.element.id !== notEl))
          } else {
            const index = dataCartElements.indexOf(el);
            dataCartElements[index] = {
              element: data,
              amount
            };
      
            setDataCartElements([...dataCartElements]);

          }
        }
      })
      .catch(err => console.log(err)
      )
  };

  useEffect(() => {
    dataCart.forEach(item => {
      getElement(String(item.element), item.amount);
    })

  }, [dataCart])

  // console.log(dataCart);
  



  useEffect(() => {
    if (step === '') setStep(stepName.cart);
  }, []);

  const content = useMemo(
    () => {
      switch (step) {
        case stepName.cart: {
          return <Cart elements={dataCartElements} />;
        }
        case stepName.delivery: {
          return <Delivery elements={dataCartElements} />;
        }
        case 'checkout': {
          return <Checkout elements={dataCartElements} />;
        }
        default: {
          return <Cart elements={dataCartElements} />;
        }
      }
    },
    [step, dataCartElements]
  );

  return (
    <div className={cartStyles.container}>
      <TitleCart
        text={titleCart.cart}
        currentStep={Object.keys(titleCart).indexOf(step) + 1}
        allSteps={Object.keys(titleCart).length}
      />
      {content}
      <TotalPrice cartElements={dataCartElements} />
    </div>
  )
}