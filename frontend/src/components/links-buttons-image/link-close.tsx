import linksimageStyles from './links-image.module.css';
import closeIcon from '../../images/menu-button-close.svg';
import cn from 'classnames';
import { FC } from 'react';

interface ILinkCloseProps {
  class?: string
}

const LinkClose: FC<ILinkCloseProps> = (props) => {
  return (
    <img src={closeIcon} alt='Личный кабинет' className={cn(linksimageStyles.image, props.class)} />
  )
}

export default LinkClose;