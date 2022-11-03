import { FC, useRef } from 'react';
import { TContacts, TOrderInfo } from '../../services/types/data';
import InputEdit from '../../ui/input-edit/input-edit';

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
    <div>
      <InputEdit
        placeholder='Имя'
        label='Имя'
        handleChange={onChange}
        value={contacts.first_name}
        name='first_name'
        inputRef={inputRef}
      />
      <InputEdit
        placeholder='Фамилия'
        label='Фамилия'
        handleChange={onChange}
        value={contacts.last_name}
        name='last_name'
      />
      <InputEdit
        placeholder='E-mail'
        label='E-mail'
        handleChange={onChange}
        value={contacts.email}
        name='email'
      />
      <InputEdit
        placeholder='Дисконтаная скидка'
        label='Дисконтаная скидка в %'
        handleChange={onChange}
        value={String(contacts.discount)}
        name='discount'
      />
      <InputEdit
        placeholder='Телефон'
        label='Телефон'
        handleChange={onChange}
        value={contacts.phoneNumber}
        name='phoneNumber'
      />

  </div>
      ) : (
        <div>
          <p>
            Имя: {order?.first_name}
          </p>
          <p>
            Фамилия: {order?.last_name}
          </p>
          <p>
            Телефон: {order?.phoneNumber}
          </p>
          {order?.email && (
            <p>
              E-mail: {order?.email}
            </p>)
          }
        </div>
      )}
    </>
  )
}

export default Contacts