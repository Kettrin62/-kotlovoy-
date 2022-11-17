import * as React from 'react';
import { FC, useContext, useState, useEffect, useMemo } from 'react';
import api from '../../api';
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
  // const [dataCartElements, setDataCartElements] = useState<Array<TDataCartElement<TDataElement>>>([])

  // const getElement = (id: string, amount: number) => {
  //   api
  //     .getElement(id)
  //     .then(data => {
  //       dataCartElements.push({
  //         element: data,
  //         amount: amount
  //       });
  //       setDataCartElements([...dataCartElements])
  //     })
  //     .catch(err => console.log(err)
  //     )
  // };

  // useEffect(() => {
  //   dataCart.forEach(item => {
  //     getElement(String(item.element), item.amount)
  //   })
  // }, [dataCart])

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
