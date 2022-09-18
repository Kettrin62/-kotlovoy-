import linksimageStyles from './links-image.module.css';
import whatsAppIcon from '../../images/whatsapp.svg';

function LinkWhatsApp() {
  return (
    <img src={whatsAppIcon} alt='WhatsApp' className={linksimageStyles.image} />
  )
}

export default LinkWhatsApp;