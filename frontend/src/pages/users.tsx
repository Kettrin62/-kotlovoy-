import { 
  useState, 
  useEffect, 
  useRef, 
  createRef 
} from 'react';
import api from '../api';
import InputSearch from '../components/input-add-element/input-search';
import User from '../components/user/user';
import { TUser } from '../services/types/data';
import usersStyles from './users.module.css';

interface IData {
  users: Array<TUser>;
  page: number;
  name: string;
}

interface IUser {
  id: number | null;
  name: string;
}

export const UsersPage = () => {
  const [usersData, setUsersData] = useState<IData>({
    users: [],
    page: 1,
    name: ''
  });
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;
  const [nameUser, setNameUser] = useState<IUser>({
    id: null,
    name: ''
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameUser({
      ...nameUser,
      name: value
    })
  };
  const onClickClose = () => {
    setNameUser({
      ...nameUser,
      name: '',
    });
  };

  const getUsers = (page = 1) => {
    api
      .getUsers({
        page,
        limit
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setUsersData({
            ...usersData,
            users: [...results],
            page: page + 1,
          })
        } else {
          setUsersData({
            ...usersData,
            users: [...usersData.users, ...results],
            page: page + 1,
          })
        }
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  const getUsersBySearch = (name: string, page = 1) => {
    api
      .getUsersSearch({
        page,
        limit,
        name
      })
      .then(data => {
        const { results, count } = data;
        setTotalCount(count);
        if (page === 1) {
          setUsersData({
            users: [...results],
            page: page + 1,
            name
          })
        } else {
          setUsersData({
            users: [...usersData.users, ...results],
            page: page + 1,
            name
          })
        }
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    if (nameUser.name === '') {
      return getUsers();
    }
    getUsersBySearch(nameUser.name)
  }, [nameUser.name]);

  const lastItem = createRef<HTMLLIElement>();
  const observerLoader = useRef<IntersectionObserver | null>();
  const actionInSight = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && usersData.users.length < totalCount) {
      if (nameUser.name === '') {
        getUsers(usersData.page)
      } else {
        getUsersBySearch(nameUser.name, usersData.page)
      }
    }
  };

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem])

  const changeDiscount = (id: number, data: {
    discount: number
  }) => {
    api
      .changeUserDiscount(id, data)
      .then(res => {
        getUsers();
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  return (
    <div>
      <div>
        <p>Найти пользователя</p>
        <InputSearch
          inputValue={nameUser.name}
          onChangeInput={onChangeInput}
          onClickClose={onClickClose}
          placeholder='Логин, email или телефон'
        />
      </div>
      {nameUser.name && usersData.users.length === 0 && (
        <p>Поиск не дал результата</p>
      )}
      <ul className={usersStyles.list}>
        {[...usersData.users].map((item, index) => {
          if (index + 1 === usersData.users.length) {
            return <User key={item.id} user={item} changeDiscount={changeDiscount} ref={lastItem} />
          }
          return <User key={item.id} user={item} changeDiscount={changeDiscount} />
        })}
      </ul>
    </div>
  )
}