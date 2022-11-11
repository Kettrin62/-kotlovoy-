import { FC, useRef, useContext, useState } from 'react';
import { TDeliveryInfo, TDeliveryMethod, TOrderInfo } from '../../services/types/data';
import Input from '../../ui/input/input';
import Button from '../button/button';
import DeliveryMethod from '../delivery-method/delivery-method';
import { priceFormat } from '../total-price/utils';
import styles from './delivery-order-info.module.css';
import DropDownIcon from '../../images/drop-down.svg';
import { DeliveryContext } from '../../services/contexts/app-context';
import cn from 'classnames';

interface IDeliveryOrderInfoProps {
  change: boolean;
  order: TOrderInfo;
  deliveryInfo: TDeliveryInfo;
  setDeliveryInfo: (item: TDeliveryInfo) => void;
  deliveryMethod: string;
  setDeliveryMethod: (name: string) => void;
}

const DeliveryOrderInfo: FC<IDeliveryOrderInfoProps> = ({ 
  change, 
  order,
  deliveryInfo,
  setDeliveryInfo,
  deliveryMethod,
  setDeliveryMethod,
}) => {

  const [methodsVisible, setMethodsVisible] = useState(false);
  const deliveryMethods = useContext(DeliveryContext);

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

  const classBorder = methodsVisible ? styles.border : '';

  return (
    <>
      {!change ? (
        <div className={styles.block}>
          <p className={styles.text}>Адрес: {address}</p>
          <p className={styles.text}>
            {order?.delivery?.company}
          </p>
          <p className={styles.text}>
            Стоимость доставки: {priceFormat(order.delivery?.price ? order.delivery.price : 0)}
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <ul className={styles.row}>
            <li className={styles.input}>
              <Input
                onChange={onChange}
                name='postal_code'
                value={String(deliveryInfo.postal_code)}
                extraClass={styles.input}
                type="text"
                id="postal_code"
                inputRef={inputRef}
                label='Индекс'
                classLabel={styles.label}
              />
            </li>
            <li className={styles.input}>
              <Input
                onChange={onChange}
                name='region'
                value={String(deliveryInfo.region)}
                extraClass={styles.input}
                type="text"
                id="region"
                label='Регион/Область'
                inputRef={inputRef}
                classLabel={styles.label}
              />
            </li>
            <li className={styles.input}>
              <Input
                onChange={onChange}
                name='city'
                value={String(deliveryInfo.city)}
                extraClass={styles.input}
                type="text"
                id="city"
                label='Город/Насел.пункт'
                inputRef={inputRef}
                classLabel={styles.label}
              />
            </li>
            <li className={cn(styles.input, styles.floor)}>
              <Input
                onChange={onChange}
                name='location'
                value={String(deliveryInfo.location)}
                extraClass={styles.input}
                type="text"
                id="location"
                label='Улица/Дом/Квартира'
                inputRef={inputRef}
                classLabel={styles.label}
              />
            </li>
            <li className={styles.input}>
              <Input
                onChange={onChange}
                name={'comment'}
                value={String(deliveryInfo.comment)}
                extraClass={styles.input}
                type="text"
                id="comment"
                label='Комментарий'
                classLabel={styles.label}
                inputRef={inputRef}
              />
            </li>
          </ul>
          <h4>Варианты доставки:
          </h4>
          <div className={styles.box}>
            <div className={cn(styles.button_box, classBorder)} onClick={onChangeMethod}>
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
              priceFormat(deliveryMethods?.filter(item => item.company === deliveryMethod)[0]?.price)
            }
          </p>
        </div>
      )}
    </>
  )
}

export default DeliveryOrderInfo