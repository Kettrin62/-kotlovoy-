import React, { FC } from 'react';
import mainbuttonStyles from './main-button.module.css';
import cn from 'classnames';

interface IMainButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  extraClass?: string; 
  secondary?: boolean;
  onClick: () => void;
}

export const MainButton: FC<IMainButtonProps> = ({ type, children, extraClass,
  secondary, onClick 
}) => {
  const secondaryClass = secondary ? mainbuttonStyles.secondary : '';
  return (
    <button onClick={onClick} type={type} className={cn(mainbuttonStyles.button, extraClass, secondaryClass)}>
      {children}
    </button>
  );
};
