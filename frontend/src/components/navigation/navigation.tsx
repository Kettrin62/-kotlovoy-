import * as React from 'react';
import navigationStyles from './navigation.module.css';
import { FC } from 'react';
import cn from 'classnames';

interface INavigationProps {
  children: React.ReactNode;
  className?: string;
}

const Navigation: FC<INavigationProps> = ({ className, children }) => {
  return (
    <nav className={cn(navigationStyles.nav, navigationStyles.nav_desktop, className)}>
      {children}
    </nav>
  )
}

export default Navigation;