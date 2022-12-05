import { FC } from 'react';
import linksimageStyles from './links-image.module.css';
import cartIcon from '../../images/cart.svg';

interface ILinkCartProps {
  count: number;
}

const LinkCart: FC<ILinkCartProps> = ({ count }) =>(
  <>
    <img src={cartIcon} alt='Корзина' className={linksimageStyles.image} />
    <div className={linksimageStyles.cart}>
      <p className={linksimageStyles.count}>{count}</p>
    </div>
  </>
)


export default LinkCart;