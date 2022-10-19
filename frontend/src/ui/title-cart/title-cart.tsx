import React, { FC } from 'react';
import { Interface } from 'readline';
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
  return (
    <div className={`${styles.header} ${extraClass}`}>
      <h2 className={styles.title}>{text}</h2>
      {currentStep && <p className={styles.steps}>{`Шаг ${currentStep} из ${allSteps}`}</p>}
      {/* {amount && <p className={styles.steps}>{`${amount} товара`}</p>} */}
    </div>
  );
};
