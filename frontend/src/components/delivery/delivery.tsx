import * as React from 'react';
import { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { DataCartContext } from '../../services/contexts/app-context';
import Element from '../element/element';

function Delivery() {

  const { dataCart, setDataCart } = useContext(DataCartContext);

  const content = useMemo(
    () => {
      return dataCart.map(el => (
        <Element 
          key={el.element.id} 
          element={el.element}
          qty={el.qty}
        />
      ))
    },
    [dataCart]
  );

  return (
    <div>
      {content}
    </div>
  )
}

export default Delivery;