import { FC, useState, useEffect } from 'react';
import api from '../api';
import Form from '../components/form/form';
import InputSearch from '../components/input-add-element/input-search';
import Modal from '../components/modal/modal';
import User from '../components/user/user';
import { TUser } from '../services/types/data';
import EditButton from '../ui/edit-button/edit-button';
import Input from '../ui/input/input';
import usersStyles from './users.module.css';

interface IUsersPageProps {
  // users: Array<TUser>;
  // changeDiscount: (id: number, data: {
  //   discount: number
  // }) => void;
}

export const UsersPage: FC<IUsersPageProps> = () => {
  const [users, setUsers] = useState<Array<TUser>>([]);

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

  const getUsers = () => {
    api
      .getUsers()
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  useEffect(() => {
    // if (isAdmin) {
      getUsers();
    // }
  }, [])

  useEffect(() => {
    if (nameUser.name === '') {
      return getUsers();
    }
    api
      .getUsersSearch(nameUser.name)
      .then(res => {
        setUsers(res.results)
      })
  }, [nameUser.name]);

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
      {/* <UsersSearch /> */}
      <div>
        <p>Найти пользователя</p>
        <InputSearch
          inputValue={nameUser.name}
          onChangeInput={onChangeInput}
          onClickClose={onClickClose}
          placeholder='Логин, email или телефон'
        />
      </div>
      {nameUser.name && users.length === 0 && (
        <p>Поиск не дал результата</p>
      )}
      <ul className={usersStyles.list}>
        {[...users].map(item => {
          return (
          <User key={item.id} user={item} changeDiscount={changeDiscount} />
          )}
        )}
      </ul>
    </div>
  )
}