import { FC, useRef, useContext, useState } from 'react';
import { DeliveryContext } from '../../services/contexts/cart-context';
import { TDeliveryInfo, TDeliveryMethod, TOrderInfo } from '../../services/types/data';
import Input from '../../ui/input/input';
import Button from '../button/button';
import DeliveryMethod from '../delivery-method/delivery-method';
import { priceFormat } from '../total-price/utils';
import styles from './delivery-order-info.module.css';
import DropDownIcon from '../../images/drop-down.svg';

interface IDeliveryOrderInfoProps {
  change: boolean;
  order: TOrderInfo;
  deliveryInfo: TDeliveryInfo;
  setDeliveryInfo: (item: TDeliveryInfo) => void;
  deliveryMethod: string;
  setDeliveryMethod: (name: string) => void;
  deliveryMethods: Array<TDeliveryMethod>;
}

const DeliveryOrderInfo: FC<IDeliveryOrderInfoProps> = ({ 
  change, 
  order,
  deliveryInfo,
  setDeliveryInfo,
  deliveryMethod,
  setDeliveryMethod,
  deliveryMethods
}) => {

  const [methodsVisible, setMethodsVisible] = useState(false);

  const index = order.postal_code ? order.postal_code + ',' : '';
  const region = order.region ? order.region + ',' : '';
  const city = order.city ? order.city + ',' : '';
  const location = order.location ? order.location : '';

  const address = `${index} ${region} ${city} ${location}`;

  const inputRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    })
  };

  const onChangeMethod = () => {
    setMethodsVisible(!methodsVisible);
  };
  const onChangeMethodName = (value: string) => {
    setDeliveryMethod(value);
    setMethodsVisible(false);
  };

  return (
    <>
      {!change ? (
        <div>
          <h4>Доставка:</h4>
          <p>Адрес: {address}</p>
          <p>
            {order?.delivery.company}
          </p>
          <p>
            Стоимость доставки: {priceFormat(order.delivery.price)}
          </p>
        </div>
      ) : (
        <div className={`${styles.container}`}>
          <ul className={styles.row}>
            <li className={`${styles.input} ${styles.inputFlex}`}>
              <div className={styles.input}>
                <label className={styles.label} htmlFor="index">
                  Индекс
                </label>
                <Input
                  onChange={onChange}
                  name='postal_code'
                  value={String(deliveryInfo.postal_code)}
                  extraClass={styles.input}
                  type="text"
                  id="postal_code"
                  inputRef={inputRef}
                />
              </div>
              <div className={styles.input}>
                <label className={styles.label} htmlFor="region">
                  Регион/Область
                </label>
                <Input
                  onChange={onChange}
                  name='region'
                  value={String(deliveryInfo.region)}
                  extraClass={styles.input}
                  type="text"
                  id="region"
                  inputRef={inputRef}
                />
              </div>
              <div className={styles.input}>
                <label className={styles.label} htmlFor="city">
                  Город/Насел.пункт
                </label>
                <Input
                  onChange={onChange}
                  name='city'
                  value={String(deliveryInfo.city)}
                  extraClass={styles.input}
                  type="text"
                  id="city"
                  inputRef={inputRef}
                />
              </div>
            </li>
            <li className={`${styles.input} ${styles.floor}`}>
              <label className={styles.label} htmlFor="address">
                Улица/Дом/Квартира
              </label>
              <Input
                onChange={onChange}
                name='location'
                value={String(deliveryInfo.location)}
                extraClass={styles.input}
                type="text"
                id="location"
                inputRef={inputRef}
              />
            </li>
            <li className={styles.input}>
              <label className={styles.label} htmlFor="comment">
                Комментарий
              </label>
              <Input
                onChange={onChange}
                name={'comment'}
                value={String(deliveryInfo.comment)}
                extraClass={styles.input}
                type="text"
                id="comment"
                inputRef={inputRef}
              />
            </li>
          </ul>
          <h4>Варианты доставки:
          </h4>
          <div className={styles.box}>
            <div className={styles.button_box} onClick={onChangeMethod}>
              <Button className={styles.button}>
                {deliveryMethod}
              </Button>
              <img src={DropDownIcon} alt='Выпадающий список' className={styles.icon} />
            </div>
            {methodsVisible && (
              <ul className={styles.list}>
                {deliveryMethods.map(item => (
                  <li key={item.id} className={styles.item} onClick={_ => onChangeMethodName(item.company)}>
                    {item.company}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p>
            Стоимость доставки: {
              priceFormat(deliveryMethods.filter(item => item.company === deliveryMethod)[0].price)
            }
          </p>
        </div>
      )}
    </>
  )
}

export default DeliveryOrderInfo