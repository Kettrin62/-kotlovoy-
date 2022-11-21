import { 
  TAction, 
  TDataCartElement, 
  TDataElement, 
  TTotalPrice 
} from '../services/types/data';

// export function checkResponse(res: Response): Promise<any> {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.statusText}`);
// };

// export function getCookie(name: string) {
//   const matches = document.cookie.match(
//     new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
//   );
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// };


// export function setCookie(name: string, value: string, props?: any) {
//   props = props || {};
//   let exp = props.expires;
//   if (typeof exp == 'number' && exp) {
//     const d = new Date();
//     d.setTime(d.getTime() + exp * 1000);
//     exp = props.expires = d;
//   }
//   if (exp && exp.toUTCString) {
//     props.expires = exp.toUTCString();
//   }
//   value = encodeURIComponent(value);
//   let updatedCookie = name + '=' + value;
//   for (const propName in props) {
//     updatedCookie += '; ' + propName;
//     const propValue = props[propName];
//     if (propValue !== true) {
//       updatedCookie += '=' + propValue;
//     }
//   }
//   updatedCookie += ';samesite=lax';
//   document.cookie = updatedCookie;
// };

// export function deleteCookie(name: string) {
//   setCookie(name, '', { expires: -1 });
// };

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