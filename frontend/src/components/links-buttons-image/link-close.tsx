import linksimageStyles from './links-image.module.css';
import closeIcon from '../../images/close.svg';
import cn from 'classnames';
import { FC } from 'react';

interface ILinkCloseProps {
  class?: string
}

const LinkClose: FC<ILinkCloseProps> = (props) => (
  <img src={closeIcon} alt='Закрыть' className={cn(linksimageStyles.image, props.class)} />
)


export default LinkClose;