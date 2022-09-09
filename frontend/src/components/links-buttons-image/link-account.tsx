import linksimageStyles from './links-image.module.css';
import accountIcon from '../../images/account.svg';

function LinkAccount() {
  return (
    <img src={accountIcon} alt='Личный кабинет' className={linksimageStyles.image} />
  )
}

export default LinkAccount;