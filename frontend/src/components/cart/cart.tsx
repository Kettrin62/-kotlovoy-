import * as React from 'react';
import { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { DataCartContext } from '../../services/contexts/app-context';
import { TotalPriceContext } from '../../services/contexts/cart-context';
import Element from '../element/element';
import cartStyles from './cart.module.css';

function Cart() {

  const { dataCart, setDataCart } = useContext(DataCartContext);
  const { totalDispatcher } = useContext(TotalPriceContext);

  useEffect(() => {
    totalDispatcher({ array: dataCart })
  }, [dataCart]);

  const content = useMemo(
    () => {
      return dataCart.map(el => (
        <Element 
          key={el.element.id} 
          element={el.element}
          amount={el.amount}
        />
      ))
    },
    [dataCart]
  );

  return (
    <ul className={cartStyles.list}>
      {content}
    </ul>
  )
}

export default Cart;
