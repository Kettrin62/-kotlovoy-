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

// функция для создания адекватной даты в ленте заказов
// function dropHMS(date: Date) {
//   date.setHours(0);
//   date.setMinutes(0);
//   date.setSeconds(0, 0);
// };

export function showMessageDateTime(dateTime: Date, type: 'date' | 'time') {
  
  const dateMins = ('0'+ dateTime.getMinutes()).slice(-2);
  // const timeZone = dateTime.getTimezoneOffset()/60 < 0 ? `i-GMT+${-dateTime.getTimezoneOffset()/60}` : `i-GMT-${-dateTime.getTimezoneOffset()/60}`;
  const monthName = months[dateTime.getMonth()];

  if (type === 'date') 
    return `${dateTime.getDate()} ${monthName} ${dateTime.getFullYear()}`;
  if (type === 'time') 
    return `${dateTime.getDate()} ${monthName} ${dateTime.getFullYear()}, ${dateTime.getHours()}:${dateMins}`;
};