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

export type TUser = {
  city: string | null;
  discount: number;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  location: string | null;
  phoneNumber: string | null;
  postal_code: string | null;
  region: string | null;
  username: string;
  is_admin: boolean;
};

export type TTypeInput = 'text' | 'password';

export type TButtonState = {
  text: string;
  class: string;
  disabled: boolean;
}

type TStatus = {
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
}

type TElementOrder = {
  readonly amount: number;
  readonly cur_price: number;
  readonly element_article: string;
  readonly element_id: number;
  readonly element_image: string;
  readonly element_meas_unit: string;
  readonly element_price: number;
  readonly element_title: string;
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
}