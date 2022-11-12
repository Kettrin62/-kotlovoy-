import * as React from 'react';
import { TDataCartElement } from './types/data';

function useLocalStorage(key: string, initialValue: Array<TDataCartElement<number>>) {
  // состояние для хранения значения
  // передаем функцию инициализации useState для однократного выполнения
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // получаем значение из локального хранилища по ключу
      const item = window.localStorage.getItem(key);
      // разбираем полученное значение или возвращаем initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // если возникла ошибка, также возвращаем начальное значение
      console.error(error);
      return initialValue;
    }
  });

  // возвращаем обернутую версию сеттера useState,
  // которая помещает новое значение в локальное хранилище
  const setValue = (value: Array<TDataCartElement<number>>) => {
    try {
      // значение может быть функцией
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // сохраняем состояние
      setStoredValue(valueToStore);
      // помещаем его в локальное хранилище
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // более продвинутая реализация может предполагать обработку ошибок в зависимости от вида ошибки
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;