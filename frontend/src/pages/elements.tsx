import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Card from '../components/card/card';
import { TDataElement } from '../services/types/data';
import elementsStyles from './elements.module.css';


export function ElementsPage() {
  const [elementsData, setElementsData] = useState<Array<TDataElement>>([]);

  const elements = elementsData.filter(item => {
    return item.available === true
  });

  const { id } = useParams<{ id?: string }>();

  const getElements = () => {
    api
      .getElements()
      .then(data => {
        const { results, count } = data;
        setElementsData(results)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getElements();
  }, []);

  return (
    <main className={elementsStyles.container}>
      <ul className={elementsStyles.list}>
        {elements.map(el => (
          <Card key={el.id} element={el} />
        ))}
                    {/* {elements.map(el => (
            <Card key={el.id} element={el} />
            ))}
                    {elements.map(el => (
            <Card key={el.id} element={el} />
            ))}
                    {elements.map(el => (
            <Card key={el.id} element={el} />
            ))}
                    {elements.map(el => (
            <Card key={el.id} element={el} />
            ))} */}
      </ul>
    </main>
  )
}