import { useEffect, useState, useContext, useRef, createRef } from 'react';
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
import AuthContext from '../services/contexts/auth-context';
import { Loader } from '../ui/loader/loader';

interface IData {
  elements: Array<TDataElement>;
  page: number;
  name?: string;
}


export function ElementsPage() {
  const [elementsData, setElementsData] = useState<IData>({
    elements: [],
    page: 1
  });
  const [elementsSearchData, setElementsSearchData] = useState<IData>({
    elements: [],
    page: 1,
    name: ''
  });

  const [groups, setGroups] = useState<Array<TDataGroups>>([]);
  const [textButton, setTextButton] = useState('Выбрать категории');
  const [visibleGroups, setVisibleGroups] = useState(false);
  const { loggedIn } = useContext(AuthContext)
  const [ elementsRequest, setElementsRequest] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const portion = 10;

  const [fetchUrl, setFetchUrl] = useState<Array<string>>([]);

  const elements = elementsData.elements.filter(item => {
    return item.available === true
  });

  const elementsSearch = elementsSearchData.elements.filter(item => {
    return item.available === true
  });





  const history = useHistory();
  const { pathname } = useLocation();

  const { id } = useParams<{ id?: string }>();
  const {name } = useParams<{ name?: string}>();

  const getElements = () => {
    // setElementsRequest(true);
    api
      .getElements({
        page: elementsData.page,
        limit: portion
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        setElementsData({
          elements: [...elementsData.elements, ...results],
          page: elementsData.page + 1,
        })
        setElementsRequest(false)
      })
      .catch(err => {
        console.log(err)
        setElementsRequest(false)
      })
  }

  const getElementsBrand = (id: string) => {
    // setElementsRequest(true);
    api
      .getElementsBrand({
        page: elementsData.page,
        limit: portion,
        id
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        setElementsData({
          elements: [...elementsData.elements, ...results],
          page: elementsData.page + 1
        })
        setElementsRequest(false)
      })
      .catch(err => {
        console.log(err)
        setElementsRequest(false)
      })
  };

  const getGroups = () => {
    setElementsRequest(true);
    api
      .getGroups()
      .then(data => {
        setGroups(data)
        setElementsRequest(false)
      })
      .catch(err => {
        console.log(err)
        setElementsRequest(false)
      })
  };

  const getGroupsById = (id: string) => {
    setElementsRequest(true);
    api
      .getGroupsById(id)
      .then(data => {
        setGroups(data)
        setElementsRequest(false)
      })
      .catch(err => {
        console.log(err)
        setElementsRequest(false)
      })
  };

  const getElementsBySearch = (name: string, page = 1) => {
    console.log('1');
    
    api
      .getElementsSearch({
        page,
        limit: portion,
        name
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setElementsSearchData({
            elements: [...results],
            page: page + 1,
            name
          })
        } else {
          setElementsSearchData({
            elements: [...elementsSearchData.elements, ...results],
            page: page + 1,
            name
          })
        }

        setElementsRequest(false)
      })
      .catch(err => {
        console.log(err)
        setElementsRequest(false)
      })
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
      console.log('kkkk');
      
      if (name) {
        getElementsBySearch(name);
      }
    }
  }, [pathname]);

  const lastItem = createRef<HTMLLIElement>();
  const observerLoader = useRef<IntersectionObserver | null>();
  const actionInSight = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && elementsData.elements.length < totalCount  && pathname === '/elements') {
      getElements();
    } else if (
      entries[0].isIntersecting && 
      elementsSearchData.elements.length < totalCount && 
      pathname === `/elements/search/${name}`
    ) {
      if (name && name === elementsSearchData.name) {
        console.log('2');
        
        getElementsBySearch(name, elementsSearchData.page)
      };
    }
  };

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem])

  const onClickHandlerButton = () => {
    if (!visibleGroups) setVisibleGroups(true)
    else setVisibleGroups(false);
    if (textButton === 'Выбрать категории') setTextButton('Скрыть категории')
    else setTextButton('Выбрать категории');
  };

  const classNameGroups = visibleGroups ? elementsStyles.show : '';



  const [activeButton, setActiveButton] = useState<Array<number>>([]);

  const getElementsGroups = (fetchUrl: string) => {
    api
      .getElementsGroups({
        page: elementsData.page,
        limit: portion,
        fetchUrl
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        setElementsData({
          elements: [...results],
          page: 1
        })

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

  if (elementsRequest) {
    return <Loader size='large' />
  }


  if (pathname === `/elements/search/${name}`) {
    console.log(elementsSearch);
    
  }
  

  return (
    <main className={elementsStyles.container}>
      <Button clickHandler={onClickHandlerButton} className={elementsStyles.button}>
        <Text class={elementsStyles.text} text={textButton} />
      </Button>
      {groupComponent}
      <ul className={elementsStyles.list}>
        {(pathname === '/elements') && elements.map((el, index) => {
          if (index + 1 === elements.length) {
            return <Card key={el.id} element={el} ref={lastItem} />
          }
          return <Card key={el.id} element={el} />
        })}
        {(pathname === `/elements/search/${name}`) && elementsSearch.map((el, index) => {
          if (index + 1 === elementsSearch.length) {
            return <Card key={el.id} element={el} ref={lastItem} />
          }
          return <Card key={el.id} element={el} />
        })}
      </ul>
    </main>
  )
}