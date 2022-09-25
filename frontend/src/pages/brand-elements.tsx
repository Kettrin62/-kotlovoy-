import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Card from '../components/card/card';
import { TDataElement } from '../services/types/data';
import elementsStyles from './elements.module.css';

export function BrandElementsPage() {
  const [elementsData, setElementsData] = useState<Array<TDataElement>>([]);

  const elements = elementsData.filter(item => {
    return item.available === true
  });

  const { id } = useParams<{ id?: string }>();

  // console.log(id);
  
  const getElementsBrand = (id: string) => {
    api
      .getElementsBrand(id)
      .then(data => {
        const { results, count } = data;
        setElementsData(results)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (id) getElementsBrand(id);
  }, []);

  // console.log(elements[0]);
  


  return (
    <main className={elementsStyles.container}>
      <div>
        
      </div>
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