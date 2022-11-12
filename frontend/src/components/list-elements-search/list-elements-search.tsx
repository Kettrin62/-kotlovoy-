import { FC, useState, useEffect } from 'react';
import api from '../../api';
import { TDataElement, TElementOrder } from '../../services/types/data';
import ElementsSearch from '../elements-search/elements-search';
import InputSearch from '../input-add-element/input-search';
import Modal from '../modal/modal';
import styles from './list-elements-search.module.css';

interface IListElementsSearchProps {
  setSearchVisible: (item: boolean) => void;
  orderCart: Array<TElementOrder>;
  setOrderCart: (arr: Array<TElementOrder>) => void;
  discount: number;
}

const ListElementsSearch: FC<IListElementsSearchProps> = ({
  setSearchVisible,
  orderCart,
  setOrderCart,
  discount
}) => {
  const [ elements, setElements ] = useState([])
  const [ showElements, setShowElements ] = useState(false);
  const [visible, setVisible] = useState(false);


  interface IElement {
    element_title: string;
    element_id: number | null;
  }

  const [ elementValue, setElementValue ] = useState<IElement>({
    element_title: '',
    element_id: null,
  })

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

  useEffect(() => {
    if (elementValue.element_title === '') {
      return setElements([])
    }
    api
      .getElementsSearch(elementValue.element_title)
      .then(res => {
        setElements(res.results)
      })
  }, [elementValue.element_title]);

  interface IElementOrder {
    id: number;
    title: string;
  }

  const handleIngredientAutofill = (data: IElementOrder) => {
    const { id, title} = data;
    setElementValue({
      ...elementValue,
      element_id: id,
      element_title: title,
    })
  };

  const onClick = (element: TDataElement) => {
    const { id, title, cur_price, article, images, measurement_unit, price, stock } = element;
    if (stock === 0) {
      setVisible(true);
      // alert('Товар закончился');
      return
    }
    handleIngredientAutofill({ id, title })
    setElements([])
    setShowElements(false)
    let arr: TElementOrder[] = [];
    arr = orderCart;
    let index: number = -1;
    const el = orderCart.find(el => el.element_id === id);
    if (el) {
      index = arr.indexOf(el);
      arr[index].amount ++;
      arr[index].element_stock--;
    } else {
      arr.push({
        amount: 1,
        cur_price: Math.floor(cur_price*discount/100),
        element_article: article,
        element_id: id,
        element_image: images[0].image,
        element_meas_unit: measurement_unit,
        element_price: price,
        element_title: title,
        element_stock: stock - 1
      });

    }
    setOrderCart([...arr]);
    setElementValue({
      ...elementValue,
      element_title: ''
    });
    onClickClose();
  }

  const handleCloseModal = () => {
    setVisible(false);
  };

  const modal = (
    <Modal header='Добавление деталей' onClose={handleCloseModal}>
      <p className={styles.modaltext}>Товар закончился</p>
    </Modal>
  )

  return (
    <div className={styles.container}>
      <InputSearch
        onClickClose={onClickClose}
        inputValue={elementValue.element_title}
        onChangeInput={onChangeNameValue}
        // onClickSearch={() => {}}
        onFocus={() => {
          setShowElements(true)
        }}
      />
    {showElements && elements.length > 0 && 
      <ElementsSearch
        elements={elements}
        onClick={(element: TDataElement) => onClick(element)}
      />
    }
    {visible && modal}
  </div>
  )
}

export default ListElementsSearch