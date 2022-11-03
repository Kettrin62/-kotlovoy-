import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouteMatch, useLocation } from 'react-router-dom';
import api from '../api';
import Button from '../components/button/button';
import { priceFormat } from '../components/total-price/utils';
import { TCardOrder, TContacts, TDataCartElement, TDataElement, TElementOrder, TOrderInfo, TStatus, TUser } from '../services/types/data';
import { showMessageDateTime } from '../utils/functions';
import orderinfoStyles from './order-info.module.css';
import DropDownIcon from '../images/drop-down.svg';
import cn from 'classnames';
import Form from '../components/form/form';
import InputEdit from '../ui/input-edit/input-edit';
import Input from '../ui/input/input';
import { AmountButton } from '../ui/amount-button/amount-button';
import { DeleteButton } from '../ui/delete-button/delete-button';
import SearchBar from '../components/search-bar/search-bar';
import InputAddElement from '../components/input-add-element/input-add-element';
import ElementsSearch from '../components/elements-search';
import InputsBox from '../components/inputs-box/inputs-box';
import Status from '../components/status/status';
import Contacts from '../components/contacts/contacts';
import ElementsCardOrder from '../components/elements-card-order/elements-card-orders';


export function OrderInfoPage() {

  const [dataContacts, setDataContacts] = useState<TContacts>({
    discount: 0,
    email: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
  })



  const match = useRouteMatch();
  const [order, setOrder] = useState<TOrderInfo | null>(null);
  const [change, setChange] = useState(false);
  const [statusName, setStatusName] = useState('');
  const [statusesVisible, setStatusesVisible] = useState(false)
  const [statuses, setStatuses] = useState<Array<TStatus | null>>([]);
  const [user, setUser] = useState<TContacts>({
    discount: 0,
    email: '',
    first_name: '',
    last_name: '',
    phoneNumber: '',
  });

  const [cancel, setCancel] = useState(false);
  const [changValue, setChangeValue] = useState(false);
  const [orderCart, setOrderCart] = useState<Array<TElementOrder>>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  interface IElement {
    element_title: string;
    element_id: number | null;
  }
  const [ elementValue, setElementValue ] = useState<IElement>({
    element_title: '',
    element_id: null,
  })
  const [ showIngredients, setShowIngredients ] = useState(false)






  // const [postalCode, setPostalCode] = useState('');
  // const onChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 6));
  //   setChangeValue(true);
  // };

  // const [region, setRegion] = useState('');
  // const onChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRegion(e.target.value);
  //   setChangeValue(true);
  // };

  // const [city, setCity] = useState('');
  // const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCity(e.target.value);
  //   setChangeValue(true);
  // };

  // const [location, setLocation] = useState('');
  // const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLocation(e.target.value);
  //   setChangeValue(true);
  // };

  const inputRef = useRef(null);



  const pathname = useLocation().pathname

  
  
  
  
  // const dispatch = useDispatch();

  const id = useParams<{ id?: string }>().id;

  const getOrderById = (id: number) => {
    api
      .getOrderId(id)
      .then(res => {
        setOrder(res);
      })
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  const getStatuses = () => {
    api
      .getStatuses()
      .then(res => setStatuses(res))
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  };

  useEffect(() => {
    getOrderById(Number(id));
    if (match.path === '/admin-panel/orders/:id') getStatuses()
  }, []);

  useEffect(() => {
    if (match.path === '/admin-panel/orders/:id') {
      if (order) {

        setOrderCart(order.elements)

        const { discount, email, first_name, last_name, phoneNumber } = order;
        setDataContacts({
          discount,
          email,
          first_name,
          last_name,
          phoneNumber,
        })
      }
    }

  }, [order]);

  console.log(dataContacts);
  


  let dateTime;
  if (order) {
    const date = new Date(order.created);
    dateTime = showMessageDateTime(date, 'time');
  };

  const index = order?.postal_code ? order?.postal_code + ',' : '';
  const region = order?.region ? order?.region + ',' : '';
  const city = order?.city ? order?.city + ',' : '';
  const location = order?.location ? order?.location : '';

  const address = `${index} ${region} ${city} ${location}`;

  const saveFile = (id: number) => {
    api 
      .downloadFile(id)
      // .then()
      .catch(err => {
        const errors = Object.values(err)
        if (errors) {
          alert(errors.join(', '))
        }
      })
  }

  const onClickButton = () => {
    saveFile(Number(id))
  }

  const onChangeOrder = () => {
    setChange(true);
    
  }









  const addElement = () => {
    setSearchVisible(true)
  }

  const onClickClose = () => {
    setSearchVisible(false);
    setElementValue({
      ...elementValue,
      element_title: ''
    })
  };

  const onChangeNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setElementValue({
      ...elementValue,
      element_title: value
    })
  };





  const handleIngredientAutofill = (data: IElementOrder) => {
    const { id, title} = data;
    setElementValue({
      ...elementValue,
      element_id: id,
      element_title: title,
    })
  }

  const [ elements, setElements ] = useState([])

  useEffect(() => {
    if (elementValue.element_title === '') {
      return setElements([])
    }
    
    api
      .getElementsSearch(elementValue.element_title)
      .then(res => {
        setElements(res.results)
      })
  }, [elementValue.element_title])
  
  interface IElementOrder {
    id: number;
    title: string;

  }

  const delivery = !change ? (
    <div>
          <h4>Доставка:</h4>
          <p>Адрес: {address}</p>
          <p>
            {order?.delivery.company}
          </p>
          <p>
            Стоимость доставки: {priceFormat(order?.delivery.price)}
          </p>
        </div>
  ) : (
    <InputsBox />
  )


  return (
    <div className={orderinfoStyles.container}>
      <h2>№ {order?.number}</h2>
      {match.path === '/admin-panel/orders/:id' && (
        <Button className={orderinfoStyles.button} clickHandler={onChangeOrder}>
          Редактировать заказ
        </Button>
      )} 
      <div className={orderinfoStyles.content}>
        {order && statuses && <Status 
          change={change}
          status={order?.status}
          statusName={statusName}
          setStatusName={setStatusName}
          statuses={statuses}
        />}
        <Contacts
          change={change}
          order={order}
          contacts={dataContacts}
          setContacts={setDataContacts}
        />
        <ul className={orderinfoStyles.ingredients}>
          {order && <ElementsCardOrder 
            change={change}
            elements={order.elements}
            orderCart={orderCart}
            setOrderCart={setOrderCart}
          />}
        </ul>

          <div>
            {change && (
              <Button className={orderinfoStyles.button} clickHandler={addElement}>
                Добавить элемент
              </Button>
            )}
            {searchVisible && (
              <div>
                <InputAddElement
                  className=''
                  onClickClose={onClickClose}
                  inputValue={elementValue.element_title}
                  onChangeInput={onChangeNameValue}
                  onClickSearch={() => {}}
                  onFocus={() => {
                    setShowIngredients(true)
                  }}
                />

                {showIngredients && elements.length > 0 && <ElementsSearch
              elements={elements}
              onClick={(element: TDataElement) => {
                const { id, title, cur_price, article, images, measurement_unit, price, stock } = element;
                handleIngredientAutofill({ id, title })
                setElements([])
                setShowIngredients(false)
                let arr: TElementOrder[] = [];
                arr = orderCart;
                arr.push({
                  amount: 1,
                  cur_price,
                  element_article: article,
                  element_id: id,
                  element_image: images[0].image,
                  element_meas_unit: measurement_unit,
                  element_price: price,
                  element_title: title,
                  element_stock: stock
                });
                setOrderCart([...arr]);
                setElementValue({
                  ...elementValue,
                  element_title: ''
                })
              }}
            />}
              </div>
            )}
          </div>
        
        {delivery}
        <div className={'mt-10 ' + orderinfoStyles.total}>
          <span className='text text_type_main-default text_color_inactive'>
            {dateTime}
          </span>
          <div className={orderinfoStyles.price}>
            <p className='text text_type_digits-default pr-2'>
              Итого: {priceFormat(order?.order_sum)}
            </p>
          </div>
        </div>
        <Button className={orderinfoStyles.button} clickHandler={onClickButton}>
          Сохранить в Exel
        </Button>
      </div>
    </div>
  )
}