export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected?: boolean
}

export interface IProductList {
  total: number;
  items: IProductItem[]
}

export interface IOrder {
  address: string;
  email: string;
  phone: string;
  payment: 'online' | 'cash',
  total: number;
  items: string[]
}

export interface IOrderSuccess {
  id: string;
  total: number
}