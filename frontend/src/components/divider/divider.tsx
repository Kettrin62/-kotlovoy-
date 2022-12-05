import { FC } from 'react';
import cn from 'classnames';
import dividerStyles from './divider.module.css';

interface IDividerProps {
  className?: string;
}

const Divider: FC<IDividerProps> = ({ className }) => (
  <hr className={cn(dividerStyles.line, className)}>
  </hr>
)

export default Divider;