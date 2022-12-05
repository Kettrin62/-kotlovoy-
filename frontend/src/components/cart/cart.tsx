import * as React from 'react';
import { FC, useContext, useEffect, useMemo } from 'react';
import { DataCartContext } from '../../services/contexts/app-context';
import { TotalPriceContext } from '../../services/contexts/cart-context';
import { TDataCartElement, TDataElement } from '../../services/types/data';
import Element from '../element/element';
import cartStyles from './cart.module.css';

interface CartProps {
  elements: TDataCartElement<TDataElement>[];
}

const Cart: FC<CartProps> = ({ elements}) => {

  const { dataCart } = useContext(DataCartContext);
  const { totalDispatcher } = useContext(TotalPriceContext);

  useEffect(() => {
    elements && totalDispatcher({ array: elements })
  }, [dataCart, elements]);

  const content = useMemo(
    () => {
      return elements.map(el => (
        <Element 
          key={el.element.id} 
          element={el.element}
          amount={el.amount}
        />
      ))
    },
    [dataCart, elements]
  );

  return (
    <ul className={cartStyles.list}>
      {content}
    </ul>
  )
}

export default Cart;
