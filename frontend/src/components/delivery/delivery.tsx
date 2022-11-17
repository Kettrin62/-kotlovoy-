import { FC } from 'react';
import DeliveryMethod from '../delivery-method/delivery-method';
import InputsBox from '../inputs-box/inputs-box';
import { TDataCartElement, TDataElement } from '../../services/types/data';

interface DeliveryProps {
  elements: TDataCartElement<TDataElement>[];
}

const Delivery: FC<DeliveryProps> = ({ elements }) => {

  return (
    <section>
      <InputsBox />
      <DeliveryMethod elements={elements} />
    </section>
  )
}

export default Delivery;