import linksimageStyles from './links-image.module.css';
import searchIcon from '../../images/search.svg';

function LinkSearch() {
  return (
    <img src={searchIcon} alt='Личный кабинет' className={linksimageStyles.image} />
  )
}

export default LinkSearch;