import { FC, useState, useCallback } from 'react';
import Form from '../components/form/form';
import Modal from '../components/modal/modal';
import User from '../components/user/user';
import UsersSearch from '../components/users-search/users-search';
import { TUser } from '../services/types/data';
import EditButton from '../ui/edit-button/edit-button';
import Input from '../ui/input/input';
import usersStyles from './users.module.css';

interface IUsersPageProps {
  users: Array<TUser>;
  changeDiscount: (id: number, data: {
    discount: number
  }) => void;
}

export const UsersPage: FC<IUsersPageProps> = ({ users, changeDiscount }) => {

  return (
    <div>
      <UsersSearch />
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