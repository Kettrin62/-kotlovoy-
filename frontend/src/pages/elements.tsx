import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Card from '../components/card/card';
import { TDataElement } from '../services/types/data';

export function ElementsPage() {
  const [elements, setElements] = useState<Array<TDataElement>>([]);

  const { id } = useParams<{ id?: string }>();

  // console.log(id);
  
  const getElementsBrand = (id: string) => {
    api
      .getElementsBrand(id)
      .then(data => setElements(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (id) getElementsBrand(id);
  }, []);

  // console.log(elements[0]);
  


  return (
    <div>
      <ul>
        {elements.map(el => (
          <Card key={el.id} element={el} />
          ))}
      </ul>
    </div>
  )
}