import * as React from 'react';
import { FC } from 'react';
import cn from 'classnames';
import buttonStyles from './button.module.css';

interface IButtonProps {
  children: React.ReactNode;
  href?: string;
  clickHandler: () => void;
  className?: string;
  disabled?: boolean;
  type?: string;
};


const Button: FC<IButtonProps> = ({
  children,
  href,
  clickHandler,
  className,
  disabled,
  type = 'button'
}) => {
  const classNames = cn(buttonStyles.button, className, {
    [buttonStyles.button_disabled]: disabled
  })
  if (href) {
    return <a
      className={classNames}
      href={href}
    >
      {children}
    </a>
  }
  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={_ => clickHandler && clickHandler()}
    >
      {children}
    </button>
  )
}


export default Button