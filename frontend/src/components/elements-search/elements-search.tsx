import { FC } from 'react';
import { TDataElement } from '../../services/types/data';
import styles from './styles.module.css'

interface IElementSearchProps {
  elements: Array<TDataElement>;
  onClick: (element: TDataElement) => void;
}

const ElementsSearch: FC<IElementSearchProps> = ({ elements, onClick }) => (
  <ul className={styles.container}>
    {elements.map(element => {
      return (
      <li key={element.id} onClick={_ => onClick(element)} className={styles.item}>
        {element.title}
      </li>)
    })}
  </ul>
)


export default ElementsSearch