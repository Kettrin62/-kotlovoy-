import React, { FC } from 'react';
import styles from './amount-button.module.css';
import cn from 'classnames';

interface IAmountButtonProps {
  children: React.ReactNode;
  extraClass?: string;
  onClick: () => void;
}

export const AmountButton: FC<IAmountButtonProps> = ({ 
  children, 
  extraClass, 
  onClick, 
  ...restProps 
}) => {
  return (
    <button type="button" onClick={onClick} className={cn(styles.button, extraClass)} {...restProps}>
      {children}
    </button>
  );
};
