import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { TUser } from '../../services/types/data';
import InputSearch from '../input-add-element/input-search';
import styles from '../orders-search/order-search.module.css';

const UsersSearch= () => {
  const [ elements, setElements ] = useState<Array<TUser>>([]);
  const [ showElements, setShowElements ] = useState(false);

  interface IUser {
    id: number | null;
    name: string;
  }

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

  useEffect(() => {
    if (nameUser.name === '') {
      return setElements([])
    }
    api
      .getUsersSearch(nameUser.name)
      .then(res => {
        setElements(res.results)
      })
  }, [nameUser.name]);

  return (
    <>
    <p>Найти пользователя</p>
      <InputSearch
        inputValue={nameUser.name}
        onChangeInput={onChangeInput}
        onClickClose={onClickClose}
        onFocus={() => {
          setShowElements(true)
        }}
        placeholder='Логин, email или телефон'
      />
      {showElements && elements.length > 0 && 
        <ul className={styles.container}>
          {elements.map(element => (
            <li key={element.id}>
              <Link to={`/profile/orders/${element.id}`}>
                {element.username} {element.email} {element.phoneNumber}
              </Link>
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default UsersSearch