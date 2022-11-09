import { FC } from 'react';
import { useParams, useRouteMatch, useLocation } from 'react-router-dom';
import { TElementOrder } from '../../services/types/data';
import { AmountButton } from '../../ui/amount-button/amount-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import { priceFormat } from '../total-price/utils';
import elementsStyles from './elements-card-order.module.css';

interface IElementsCardOrderProps {
  change: boolean;
  elements: Array<TElementOrder>;
  orderCart: Array<TElementOrder>;
  setOrderCart: (arr: Array<TElementOrder>) => void;
}

const ElementsCardOrder: FC<IElementsCardOrderProps> = ({ 
  change, 
  elements,
  orderCart,
  setOrderCart 
}) => {
  const match = useRouteMatch();
  const elementsCardOrder = elements.map(item => {
    const { amount, element_image: image, element_title: title, cur_price, element_id: id } = item;
    return (
      <li className={elementsStyles.product} key={id}>
        <div className={elementsStyles.leftbox}>
          <img className={elementsStyles.img} src={image} alt={title} />
          <p className={elementsStyles.text}>{title}</p>
        </div>
        <div className={elementsStyles.rightbox}>
          <p className={elementsStyles.count}>×{amount}</p>
          <div className={elementsStyles.price}>
            <p className={elementsStyles.price} data-testid={`price-amount-${id}`}>
              {priceFormat(cur_price * amount)}
            </p>
          </div>
        </div>
      </li>
    )
  });

  const changeElementsCardOrder = orderCart.map(item => {
    const { amount, element_image: image, element_title: title, cur_price, element_id: id } = item;
    let arr: TElementOrder[] = [];
    
    const onDelete = () => {
      setOrderCart(orderCart.filter(el => el.element_id !== id))
    };
    
    const decrease = () => {
      if (amount === 1) {
        onDelete();
      } else {
        arr = orderCart;
        let index: number = -1;
        const el = orderCart.find(el => el.element_id === id);
        if (el) {
          index = arr.indexOf(el);
        };
        arr[index].amount = amount - 1;
        setOrderCart([...arr]);
      }
    };
    
    const increase = () => {
      arr = orderCart;
      let index: number = -1;
      const el = orderCart.find(el => el.element_id === id);
      if (el) {
        index = arr.indexOf(el);
      };
      if (arr[index].amount < arr[index].element_stock + amount) {
        arr[index].amount ++;
        arr[index].element_stock--
        setOrderCart([...arr]);
      }
    };

    return (
      <li className={elementsStyles.product} key={id}>
        <div className={elementsStyles.leftbox}>
          <img className={elementsStyles.img} src={image} alt={title} />
          <p className={elementsStyles.text}>{title}</p>
        </div>
        <div className={elementsStyles.rightbox}>
          {change ? (
          <div className={elementsStyles.amountbox}>
            <AmountButton data-testid={`decrease-${id}`} onClick={decrease}>-</AmountButton>
            <p className={elementsStyles.amount} data-testid={`product-amount-${id}`}>{amount}</p>
            <AmountButton data-testid={`increase-${id}`} onClick={increase}>+</AmountButton>
          </div>
          ) : (<p className={elementsStyles.count}>×{amount}</p>)}
          <div className={elementsStyles.price}>
            <p className={elementsStyles.price} data-testid={`price-amount-${id}`}>
              {priceFormat(cur_price * amount)}
            </p>
          </div>
          {change && <DeleteButton onDelete={onDelete} />}
        </div>
      </li>
    )
  })

  return(
    <>
      {match.path === '/admin-panel/orders/:id' ? changeElementsCardOrder : elementsCardOrder}
    </>
  )
}

export default ElementsCardOrder