import * as React from 'react';
import { FC } from 'react';
import cn from 'classnames';
import buttonStyles from './button.module.css';

interface IButtonProps {
  children: React.ReactNode;
  // modifier: string;
  href?: string;
  clickHandler: () => void;
  className?: string;
  disabled?: boolean;
  type?: string;
};


const Button: FC<IButtonProps> = ({
  children,
  // modifier = 'style_light-blue',
  href,
  clickHandler,
  className,
  disabled,
  type = 'button'
}) => {
  const classNames = cn(buttonStyles.button, className, {
    // [styles[`button_${modifier}`]]: modifier,
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