import { 
  TAction, 
  TDataCartElement, 
  TDataElement, 
  TTotalPrice 
} from '../services/types/data';

export function reducer(_totalPrice: TTotalPrice, action: TAction) {
  const deliveryPrice =
    (action.delivery?.selectedMethod &&
      action.delivery?.methods.
      find(method => method.id === action.delivery?.selectedMethod)?.price) || 
    0;

  const total = deliveryPrice +
    action.array.reduce((
      acc: number, 
      item: TDataCartElement<TDataElement>
    ) => acc + item.element.cur_price * item.amount, 0);

  return { price: total };
}

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export function showMessageDateTime(dateTime: Date, type: 'date' | 'time') {
  const dateMins = ('0'+ dateTime.getMinutes()).slice(-2);
  const monthName = months[dateTime.getMonth()];

  if (type === 'date') 
    return `${dateTime.getDate()} ${monthName} ${dateTime.getFullYear()}`;
  if (type === 'time') 
    return `${dateTime.getDate()} ${monthName} ${dateTime.getFullYear()}, ${dateTime.getHours()}:${dateMins}`;
};