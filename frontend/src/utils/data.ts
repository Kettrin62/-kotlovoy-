import { TDataFooter } from "../services/types/data";
import map from '../images/map.svg';
import mail from '../images/mail.svg';
import telephoneIcon from '../images/telephone-icon.svg';

export const dataFooter: Array<TDataFooter> = [
  {
    name: 'Иконка телефона',
    image: `${telephoneIcon}`,
    text: '+7 920 920 00 00',
  },
  {
    name: 'Иконка e-mail адреса',
    image: `${mail}`,
    text: 'kotlovoj@mail.ru',
  },
  {
    name: 'Иконка карты',
    image: `${map}`,
    text: '390044, г.Рязань, ул.Новая, д.20',
  }
]