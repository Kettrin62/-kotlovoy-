import { FC, useContext, useCallback, useState } from 'react';
import { 
  useHistory,
} from 'react-router-dom';
import { AmountButton } from '../../ui/amount-button/amount-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import styles from './element.module.css';
import { priceFormat } from '../total-price/utils';
import cn from 'classnames';
import { TDataElement } from '../../services/types/data';
import { DataCartContext } from '../../services/contexts/app-context';

interface IElementProps {
  element: TDataElement;
  amount: number;
}

const Element: FC<IElementProps> = ({ 
  element,
  amount,
}) => {
  const {
    id,
    title,
    cur_price,
    images,
    stock
  } = element;

  const history = useHistory();
  const { dataCart, setDataCart } = useContext(DataCartContext);
  const [text, setText] = useState('');

  const onDelete = () => {
    setDataCart(dataCart.filter(el => el.element !== id))
  };

  const decrease = () => {
    if (amount === 1) {
      onDelete();
    } else {
      let index: number = -1;
      const el = dataCart.find(el => el.element === id);
      if (el) {
        index = dataCart.indexOf(el);
      };
      dataCart[index] = {
        element: id,
        amount: --amount
      };
      setDataCart([...dataCart]);
    }
  };

  const increase = () => {
    let index: number = -1;
    const el = dataCart.find(el => el.element === id);
    if (el) {
      index = dataCart.indexOf(el);
    };
    if (dataCart[index].amount < stock) {
      dataCart[index] = {
        element: id,
        amount: ++amount
      };
      setDataCart([...dataCart]);
    } else {
      setText(`Доступно ${stock}шт.`);
    }
  };

  const onClickButton = useCallback(
    () => {
      history.push({ pathname: `/elements/${id}` });
    },
    [history]
  );

  return (
    <li className={`${styles.product}`}>
      <div className={styles.container}>
        <img className={styles.img} src={images[0].image} alt={title} onClick={onClickButton} />
        <p className={styles.text} onClick={onClickButton}>{title}</p>
      </div>
      <div className={cn(styles.container, styles.box)}>
          <div className={styles.amountbox}>
            <AmountButton data-testid={`decrease-${id}`} onClick={decrease}>-</AmountButton>
            <p className={styles.amount} data-testid={`product-amount-${id}`}>{amount}</p>
            <AmountButton data-testid={`increase-${id}`} onClick={increase}>+</AmountButton>
          </div>
          {text && <p className={styles.alert}>{text}</p>}
        <div className={styles.price}>
          <p className={styles.price} data-testid={`price-amount-${id}`}>
            {priceFormat(cur_price * amount)}
          </p>
        </div>
        <DeleteButton onDelete={onDelete} />
      </div>
    </li>
  );
};

export default Element;
