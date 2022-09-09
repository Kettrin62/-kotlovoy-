import linksimageStyles from './links-image.module.css';
import searchIcon from '../../images/search.svg';
import cn from 'classnames';
import { FC } from 'react';

interface ILinkSearchtProps {
  class?: string
}

const LinkSearch: FC<ILinkSearchtProps> = (props) => {
  return (
    <img src={searchIcon} alt='Личный кабинет' className={cn(linksimageStyles.image, props.class)} />
  )
}

export default LinkSearch;