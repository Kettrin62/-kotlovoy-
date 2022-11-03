import { FC } from 'react';
import { TDataElement, TElementOrder } from '../../services/types/data';
import styles from './styles.module.css'

interface IElementSearchProps {
  elements: Array<TDataElement>;
  onClick: (element: TDataElement) => void;
}

const ElementsSearch: FC<IElementSearchProps> = ({ elements, onClick }) => {
  return (
    <div className={styles.container}>
    {elements.map((element) => {
      return <div key={element.id} onClick={_ => onClick(element)}>{element.title}</div>
    })}
  </div>
  )
}

export default ElementsSearch