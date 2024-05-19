export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null
}

export interface IProductList {
  total: number;
  items: string[]
}

export interface IUserInfo {
  address: string;
  email: string;
  phone: string;
  payment: 'cash' | 'card'
}

export interface ISuccessfulOrder {
  id: string;
  total: number
}