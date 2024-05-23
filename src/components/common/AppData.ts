import { IOrder, IOrderSuccess, IProductItem, IProductList } from "../../types";


export interface IAppData{
  getCards(): IProductList;
  getCard(id: string): IProductItem;
  getTotal(): number;
  getOrder(): IProductItem[];
  removeFromOrder(id: string): void;
  addToOrder(id: string): void;
  validateForm(form: HTMLElement): void;
  successOrder(order: IOrder): IOrderSuccess;
}

export class AppData implements IAppData{
  
}