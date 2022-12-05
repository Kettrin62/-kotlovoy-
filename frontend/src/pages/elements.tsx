import { 
  useEffect, 
  useState, 
  useContext, 
  useRef, 
  createRef 
} from 'react';
import { 
  useParams,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import api from '../api';
import Button from '../components/button/button';
import Card from '../components/card/card';
import Text from '../components/text/text';
import { TDataElement, TDataGroups } from '../services/types/data';
import elementsStyles from './elements.module.css';
import { AuthContext } from '../services/contexts/auth-context';
import { Loader } from '../ui/loader/loader';

interface IData {
  elements: Array<TDataElement>;
  page: number;
  name?: string;
}

export function ElementsPage() {
  const [elementsData, setElementsData] = useState<IData>({
    elements: [],
    page: 1,
    name: ''
  });
  const [groups, setGroups] = useState<Array<TDataGroups>>([]);
  const [textButton, setTextButton] = useState('Выбрать категории');
  const [activeButton, setActiveButton] = useState<Array<number>>([]);
  const [visibleGroups, setVisibleGroups] = useState(false);
  const [ elementsRequest, setElementsRequest] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const portion = 10;
  const { setAuth } = useContext(AuthContext);

  const [fetchUrl, setFetchUrl] = useState<Array<string>>([]);

  const elements = elementsData.elements.filter(item => {
    return item.available === true
  });

  const { pathname } = useLocation();
  const { id } = useParams<{ id?: string }>();
  const {name } = useParams<{ name?: string}>();

  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

  const getElements = (page = 1) => {
    api
      .getElements({
        token,
        page,
        limit: portion
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setElementsData({
            elements: [...results],
            page: page + 1,
            name
          })
        } else {
          setElementsData({
            elements: [...elementsData.elements, ...results],
            page: page + 1,
            name
          })
        }
        setElementsRequest(false)
      })
      .catch(err => {
        localStorage.removeItem('token');
        setAuth({
          loggedIn: false,
          isAdmin: false,
        })
      })
  }

  const getElementsBrand = (id: string, page = 1) => {
    api
      .getElementsBrand({
        token,
        page: elementsData.page,
        limit: portion,
        id
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setElementsData({
            elements: [...results],
            page: page + 1,
            name
          })
        } else {
          setElementsData({
            elements: [...elementsData.elements, ...results],
            page: page + 1,
            name
          })
        }
        setElementsRequest(false)
      })
      .catch(err => {
        console.log(err)
        localStorage.removeItem('token');
        setAuth({
          loggedIn: false,
          isAdmin: false,
        })
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
          setElementsData({
            elements: [...results],
            page: page + 1,
            name
          })
        } else {
          setElementsData({
            elements: [...elementsData.elements, ...results],
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
      getGroups();
      setFetchUrl(['elements/?&']);
    };
    if (pathname === `/elements/brand/${id}`) {
      if (id) {
        getElementsBrand(id);
        getGroupsById(id);
        setFetchUrl([`elements/?brand=${id}&`]);
      }
    };
    if (pathname === `/elements/search/${name}`) {
      if (name) getElementsBySearch(name);
    }
  }, [pathname, token]);

  let arrIdGroup: number[] = activeButton;
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

  const lastItem = createRef<HTMLLIElement>();
  const observerLoader = useRef<IntersectionObserver | null>();
  const actionInSight = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && elementsData.elements.length < totalCount) {
      if (pathname === '/elements') {
        if (activeButton.length === 0) {
          getElements(elementsData.page)
        } else getElementsGroups(fetchUrl.join(''), elementsData.page)
      }
      if (pathname === `/elements/search/${name}` && name && name === elementsData.name) {
        getElementsBySearch(name, elementsData.page)
      }
      if (pathname === `/elements/brand/${id}` && id) getElementsBrand(id, elementsData.page)
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

  const getElementsGroups = (fetchUrl: string, page = 1) => {
    api
      .getElementsGroups({
        page,
        limit: portion,
        fetchUrl
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setElementsData({
            elements: [...results],
            page: page + 1,
          })
        } else {
          setElementsData({
            elements: [...elementsData.elements, ...results],
            page: page + 1,
          })
        }
      })
      .catch(err => console.log(err))
  }

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

  return (
    <main className={elementsStyles.container}>
      <Button clickHandler={onClickHandlerButton} className={elementsStyles.button}>
        <Text class={elementsStyles.text} text={textButton} />
      </Button>
      {groupComponent}
      <ul className={elementsStyles.list}>
        {elements.map((el, index) => {
          if (index + 1 === elements.length) {
            return <Card key={el.id} element={el} ref={lastItem} />
          }
          return <Card key={el.id} element={el} />
        })}
      </ul>
    </main>
  )
}