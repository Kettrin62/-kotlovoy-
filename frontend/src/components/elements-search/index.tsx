import { FC } from 'react';
import { TDataElement, TElementOrder } from '../../services/types/data';
import styles from './styles.module.css'

interface IElementOrder {
  id: number;
  title: string;
  amount: number;
  cur_price: number;
  article: string;

  element_image: string;
  element_meas_unit: string;
  element_price: number;
  element_title: string;
  element_stock: number;
}

interface IElementSearchProps {
  elements: Array<TDataElement>;
  onClick: (element: TDataElement) => void;
}

const ElementsSearch: FC<IElementSearchProps> = ({ elements, onClick }) => {
  console.log(elements);
  
  return (
    <div className={styles.container}>
    {elements.map((element) => {
      return <div key={element.id} onClick={_ => onClick(element)}>{element.title}</div>
    })}
  </div>
  )
}

export default ElementsSearch