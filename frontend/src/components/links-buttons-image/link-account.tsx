import { FC } from 'react';
import linksimageStyles from './links-image.module.css';
import accountIcon from '../../images/account.svg';
import loginIcon from '../../images/login.svg';

interface ILinkAccountProps {
  login: boolean;
}

const LinkAccount: FC<ILinkAccountProps> = ({ login }) => {
  const image = login ? loginIcon : accountIcon;

  return (
    <img src={image} alt='Личный кабинет' className={linksimageStyles.image} />
  )
}

export default LinkAccount;