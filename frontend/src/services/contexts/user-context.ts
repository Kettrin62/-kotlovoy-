import React from 'react'
import { TUser } from '../types/data';

interface IUserContext {
  user: TUser | null;
  setUser: (user: TUser) => void;
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  setUser: () => {}
});