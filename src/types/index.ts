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
  items: IProductItem[]
}

export interface IUserInfo {
  address: string;
  email: string;
  phone: string;
  payment: 'online' | 'cash'
}

export interface ISuccessfulOrder {
  id: string;
  total: number
}