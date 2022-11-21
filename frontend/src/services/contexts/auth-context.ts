import React from 'react';
import { TAuth } from '../types/data';

interface IAuthContext {
  auth: TAuth;
  setAuth: (auth: TAuth) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  auth: {
    loggedIn: null,
    isAdmin: null,
  },
  setAuth: () => {}
});