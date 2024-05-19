export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null
}

export interface IUserInfo {
  adress: string;
  email: string;
  phone: string;
  payment: 'cash' | 'card'
}

export interface IBasket {
  total: number;
  items: string[]
}

export interface ISuccessfulOrder {
  id: string;
  total: number
}