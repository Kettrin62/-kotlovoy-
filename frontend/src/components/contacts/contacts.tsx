import { FC, useRef } from 'react';
import { TContacts, TOrderInfo } from '../../services/types/data';
import InputEdit from '../../ui/input-edit/input-edit';
import contactsStyles from './contacts.module.css';
import cn from 'classnames';

interface IContactsProps {
  change: boolean;
  order: TOrderInfo | null;
  contacts: TContacts;
  setContacts: (data: TContacts) => void;
  
}

const Contacts: FC<IContactsProps> = ({ change, order, contacts, setContacts }) => {
  const inputRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setContacts({
      ...contacts,
      [name]: value,
    })
  }

  return (
    <>
      {change ? (
    <div className={contactsStyles.container}>
      <InputEdit
        placeholder='Имя'
        label='Имя'
        handleChange={onChange}
        value={contacts.first_name}
        name='first_name'
        inputRef={inputRef}
        className={contactsStyles.input}
        classLabel={contactsStyles.label}
      />
      <InputEdit
        placeholder='Фамилия'
        label='Фамилия'
        handleChange={onChange}
        value={contacts.last_name}
        name='last_name'
        className={contactsStyles.input}
        classLabel={contactsStyles.label}
      />
      <InputEdit
        placeholder='E-mail'
        label='E-mail'
        handleChange={onChange}
        value={contacts.email}
        name='email'
        className={contactsStyles.input}
        classLabel={contactsStyles.label}
      />
      <InputEdit
        placeholder='Телефон'
        label='Телефон'
        handleChange={onChange}
        value={contacts.phoneNumber}
        name='phoneNumber'
        className={contactsStyles.input}
        classLabel={contactsStyles.label}
      />
      <InputEdit
        placeholder='Дисконтаная скидка'
        label='Дисконтаная скидка в %'
        handleChange={onChange}
        value={String(contacts.discount)}
        name='discount'
        className={contactsStyles.input}
        classLabel={contactsStyles.label}
      />

  </div>
      ) : (
        <div className={contactsStyles.box}>
          <p className={contactsStyles.text}>
            Имя: {order?.first_name}
          </p>
          <p className={contactsStyles.text}>
            Фамилия: {order?.last_name}
          </p>
          <p className={contactsStyles.text}>
            Телефон: {order?.phoneNumber}
          </p>
          {order?.email && (
            <p className={contactsStyles.text}>
              E-mail: {order?.email}
            </p>)
          }
        </div>
      )}
    </>
  )
}

export default Contacts