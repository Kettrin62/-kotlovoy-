import linksimageStyles from './links-image.module.css';
import logoIcon from '../../images/logo.png';

function LinkMain() {
  return (
    <img src={logoIcon} alt='Котловой62' className={linksimageStyles.logo} />
  )
}

export default LinkMain;