import React, { FC } from 'react';
import { Interface } from 'readline';
import { nameStepCart, titleCart } from '../../utils/data';
import styles from './title-cart.module.css';

interface ITitleCartProps {
  text: String;
  currentStep: number;
  allSteps: number;
  extraClass?: String;
}

export const TitleCart: FC<ITitleCartProps>  = ({ 
  text, 
  currentStep, 
  allSteps, 
  extraClass 
}) => {
  let title = '';
  switch (currentStep) {
    case 1:
      title = nameStepCart.cart;
      break;
    case 2:
      title = nameStepCart.delivery;
      break;
    case 3:
      title = nameStepCart.checkout;
  }

  return (
    <div className={`${styles.header} ${extraClass}`}>
      <h2 className={styles.title}>{text}</h2>
      {currentStep && <p className={styles.steps}>{`${title} - Шаг ${currentStep} из ${allSteps}`}</p>}
    </div>
  );
};
