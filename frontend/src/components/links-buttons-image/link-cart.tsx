import linksimageStyles from './links-image.module.css';
import cartIcon from '../../images/cart.svg';

function LinkCart() {
  return (
    <>
      <img src={cartIcon} alt='Корзина' className={linksimageStyles.image} />
      <div className={linksimageStyles.cart}>
        <p className={linksimageStyles.count}>0</p>
      </div>
    </>
  )
}

export default LinkCart;