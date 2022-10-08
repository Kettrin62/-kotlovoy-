import linksimageStyles from './links-image.module.css';
import logoIcon from '../../images/logo.png';
import logo1Icon from '../../images/1.jpg';

function LinkMain() {
  return (
    <img src={logoIcon} alt='Котловой62' className={linksimageStyles.logo} />
    // <img src={logo1Icon} alt='Котловой62' className={linksimageStyles.logo} />
  )
}

export default LinkMain;