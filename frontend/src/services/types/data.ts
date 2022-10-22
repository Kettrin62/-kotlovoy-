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
  readonly qty: number;
}

export type TTotalPrice = {
  readonly price: number;
}

export type TDeliveryMethod = {
  readonly thumb: string;
  readonly id: number;
  readonly text: string;
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
  readonly index?: string,
  readonly region?: string;
  readonly city?: string;
  readonly address?: string;
  readonly secondName?: string;
  readonly firstName?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly comment?: string;
}
