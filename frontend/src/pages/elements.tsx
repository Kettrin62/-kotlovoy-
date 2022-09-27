import { useEffect, useState } from 'react';
import { 
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import api from '../api';
import Card from '../components/card/card';
import { TDataElement, TDataGroups } from '../services/types/data';
import elementsStyles from './elements.module.css';


export function ElementsPage() {
  const [elementsData, setElementsData] = useState<Array<TDataElement>>([]);
  const [groups, setGroups] = useState<Array<TDataGroups>>([]);

  const elements = elementsData.filter(item => {
    return item.available === true
  });

  const history = useHistory();
  const { pathname } = useLocation();
  console.log(pathname);
  console.log(useParams());
  
  
  

  const { id } = useParams<{ id?: string }>();
  const {name } = useParams<{ name?: string}>();
  console.log(id);
  

  const getElements = () => {
    api
      .getElements()
      .then(data => {
        const { results, count } = data;
        setElementsData(results)
      })
      .catch(err => console.log(err))
  }

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

  const getElementsBySearch = (name: string) => {
    api
      .getElementsSearch(name)
      .then(data => {
        const { results, count } = data;
        setElementsData(results)
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    if (pathname === '/elements') getElements();
    if (pathname === `/elements/brand/${id}`) {
      if (id) {
        getElementsBrand(id);
        getGroupsById(id);
      }
    };
    if (pathname === `/elements/search/${name}`) {
      if (name) {
        getElementsBySearch(name);
      }
    }
  }, [pathname]);

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