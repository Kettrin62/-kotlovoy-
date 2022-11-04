import React from 'react';
import { TAuth } from '../types/data';

export default React.createContext<TAuth>({
  loggedIn: null,
  isAdmin: null,
});