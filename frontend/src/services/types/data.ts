export type TDataBrand = {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly display_order: number;
}

export type TDataSwiper = {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly text: string;
  readonly available: boolean;
  readonly created: string;
  readonly display_order: number;

}

export type TDataFooter = {
  readonly name: string;
  readonly image: string;
  readonly text: string;
}

type TImageElement = {
  readonly id: number;
  readonly image: string;
  readonly display_order: number;
}

type TGroup = {
  readonly id: number;
  readonly title: string;
}

export type TDataElement = {
  readonly id: number;
  readonly title: string;
  readonly measurement_unit: string;
  readonly description: string;
  readonly images: ReadonlyArray<TImageElement>;
  readonly price: number;
  readonly stock: number;
  readonly article: string;
  readonly available: boolean;
  readonly created: string;
  readonly brand: TDataBrand;
  readonly groups: ReadonlyArray<TGroup>;
  readonly cur_price: number;
}

export type TDataPathNames = {
  readonly main: string;
  readonly elements: string;
  readonly pay: string;
  readonly delivery: string;
  readonly about: string;
  readonly contacts: string;
  readonly feedback: string;
}

export type TDataGroups = {
  readonly id: number;
  readonly title: string;
}

export type TDataCartElement = {
  readonly element: TDataElement;
  readonly amount: number;
}

export type TTotalPrice = {
  readonly price: number;
}

export type TDeliveryMethod = {
  readonly comment: string;
  readonly id: number;
  readonly company: string;
  readonly duration: string;
  readonly price: number;
}

export type TAction = {
  readonly array: Array<TDataCartElement>;
  readonly delivery?: {
    methods: Array<TDeliveryMethod>;
    selectedMethod: number;
  }
}

export type TDeliveryForm = {
  index?: string,
  region?: string;
  city?: string;
  address?: string;
  secondName?: string;
  firstName?: string;
  phone?: string;
  email?: string;
  comment?: string;
  done?: boolean;
}

type TLocationObj = {
  pathname: string;
}

export type TUseLocationState = {
  from: TLocationObj;
}

export type TFormRegister = {
  email: string;
  password: string;
  username: string;
  current_password: string;
  new_password: string;
}

export type TFormAuth = {
  email: string;
  password: string;
}

export type TContacts = {
  discount: number;
  email: string;
  first_name: string;
  last_name: string;
  phoneNumber: string;
}

export type TDeliveryInfo = {
  city: string | null;
  location: string | null;
  postal_code: string | null;
  region: string | null;
  comment: string | null;
}

export type TUser = TContacts & TDeliveryInfo & {
  id: number;
  username: string;
  is_admin: boolean;
};

export type TTypeInput = 'text' | 'password';

export type TButtonState = {
  text: string;
  class: string;
  disabled: boolean;
}

export type TStatus = {
  comment?: string;
  id: number;
  status: string;
}

export type TCardOrder = {
  readonly id: number;
  readonly created: Date;
  // readonly element_sum: number;
  readonly number: string;
  readonly order_sum: number;
  readonly status: TStatus;
  readonly email?: string;
  readonly phoneNumber?: string;
}

export type TElementOrder = {
  amount: number;
  cur_price: number;
  element_article: string;
  element_id: number;
  element_image: string;
  element_meas_unit: string;
  element_price: number;
  element_title: string;
  element_stock: number;
}

export type TOrderInfo = TCardOrder & {
  readonly elements: Array<TElementOrder>;
  readonly discount: number;
  readonly delivery: TDeliveryMethod;
  readonly first_name: string;
  readonly last_name: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly postal_code?: string;
  readonly region?: string;
  readonly city?: string;
  readonly location?: string;
  readonly comment?: string;
}

