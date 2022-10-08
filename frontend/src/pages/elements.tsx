import { useEffect, useState } from 'react';
import { 
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import api from '../api';
import Button from '../components/button/button';
import Card from '../components/card/card';
import Text from '../components/text/text';
import { TDataElement, TDataGroups } from '../services/types/data';
import elementsStyles from './elements.module.css';


export function ElementsPage() {
  const [elementsData, setElementsData] = useState<Array<TDataElement>>([]);
  const [groups, setGroups] = useState<Array<TDataGroups>>([]);
  const [textButton, setTextButton] = useState('Выбрать категории');
  const [visibleGroups, setVisibleGroups] = useState(false);

  const [fetchUrl, setFetchUrl] = useState<Array<string>>([]);

  const elements = elementsData.filter(item => {
    return item.available === true
  });

  const history = useHistory();
  const { pathname } = useLocation();

  const { id } = useParams<{ id?: string }>();
  const {name } = useParams<{ name?: string}>();

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

  const getGroups = () => {
    api
      .getGroups()
      .then(data => setGroups(data))
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
    if (pathname === '/elements') {
      getElements();
      // arrUrl.push('elements/?&');
      getGroups();
      setFetchUrl(['elements/?&']);
      // setFetchUrl('elements/?&');
    };
    if (pathname === `/elements/brand/${id}`) {
      if (id) {
        getElementsBrand(id);
        getGroupsById(id);
        // arrUrl.push(`elements/?brand=${id}&`);
        setFetchUrl([`elements/?brand=${id}&`]);
        // setFetchUrl(`elements/?brand=${id}&`);
      }
    };
    if (pathname === `/elements/search/${name}`) {
      if (name) {
        getElementsBySearch(name);
      }
    }
  }, [pathname]);

  const onClickHandlerButton = () => {
    if (!visibleGroups) setVisibleGroups(true)
    else setVisibleGroups(false);
    if (textButton === 'Выбрать категории') setTextButton('Скрыть категории')
    else setTextButton('Выбрать категории');
  };

  const classNameGroups = visibleGroups ? elementsStyles.show : '';







  const [activeButton, setActiveButton] = useState<Array<number>>([]);

  const getElementsGroups = (url: string) => {
    api
      .getElementsGroups(url)
      .then(data => {
        setElementsData(data.results);

      })
      .catch(err => console.log(err))
  }

  let arrIdGroup: number[] = activeButton;
  // let fetchUrl = '';
  let arrUrl: string[] = fetchUrl;




  const onClickHandler = (idGroup: number) => {
    if(!activeButton.some(el => el === idGroup)) {
      arrIdGroup.push(idGroup);
      setActiveButton([...arrIdGroup]);
      arrUrl.push(`groups=${idGroup}&`);
      setFetchUrl([...arrUrl]);
      getElementsGroups(fetchUrl.join(''));
    } else {
      arrIdGroup = activeButton.filter(el => el !== idGroup);
      setActiveButton([...arrIdGroup]);
      arrUrl = fetchUrl.filter(el => el !== `groups=${idGroup}&`);
      setFetchUrl([...arrUrl]);
      getElementsGroups(arrUrl.join(''));
    };
  };



  const groupComponent = (
    <ul className={cn(elementsStyles.list_group, classNameGroups)}>
      {groups.map(item => {
        const classActive = activeButton.some(el => el === item.id) ? elementsStyles.button_group_active : '';
        return (
          <li key={item.id}>
            <Button clickHandler={() => {onClickHandler(item.id)}} className={cn(elementsStyles.button_group, classActive)}>
              <Text class={elementsStyles.text_group} text={item.title} />
            </Button>
          </li>
        )
      })}
    </ul>
  )


  return (
    <main className={elementsStyles.container}>
      <Button clickHandler={onClickHandlerButton} className={elementsStyles.button}>
        <Text class={elementsStyles.text} text={textButton} />
      </Button>
      {groupComponent}
      <ul className={elementsStyles.list}>
        {elements.map(el => (
          <Card key={el.id} element={el} />
        ))}
      </ul>
    </main>
  )
}