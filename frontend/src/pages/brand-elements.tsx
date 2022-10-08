import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Button from '../components/button/button';
import Card from '../components/card/card';
import Text from '../components/text/text';
import { TDataElement, TDataGroups } from '../services/types/data';
import elementsStyles from './elements.module.css';

export function BrandElementsPage() {
  const [elementsData, setElementsData] = useState<Array<TDataElement>>([]);
  const [groups, setGroups] = useState<Array<TDataGroups>>([]);

  const elements = elementsData.filter(item => {
    return item.available === true
  });

  const { id } = useParams<{ id?: string }>();

  const getElementsBrand = (id: string) => {
    api
      .getElementsBrand(id)
      .then(data => {
        const { results, count } = data;
        setElementsData(results)
      })
      .catch(err => console.log(err))
  };

  const getGroupsById = (id: string) => {
    api
      .getGroupsById(id)
      .then(data => setGroups(data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    if (id) {
      getElementsBrand(id);
      getGroupsById(id);
    }
  }, []);


  return (
    <main className={elementsStyles.container}>
      {/* <Groups groups={groups} /> */}
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