import * as React from 'react';
import { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { DataCartContext } from '../../services/contexts/app-context';
import DeliveryMethod from '../delivery-method/delivery-method';
import Element from '../element/element';
import InputsBox from '../inputs-box/inputs-box';

function Delivery() {

  const { dataCart, setDataCart } = useContext(DataCartContext);


  return (
    <div>
      <InputsBox />
      <DeliveryMethod />
    </div>
  )
}

export default Delivery;