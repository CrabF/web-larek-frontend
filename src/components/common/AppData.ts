import { IOrder, IOrderSuccess, IProductItem, IProductList } from "../../types";
import { IEvents } from "../base/events";


export interface IAppData{
  getCards(): IProductItem[];
  setCards(items: IProductItem[]): void;
  getCard(id: string): IProductItem;
  getTotal(): number;
  getOrder(): IProductItem[];
  removeFromOrder(id: string): void;
  addToOrder(id: string): void;
  validateForm(form: HTMLElement): void;
  successOrder(order: IOrder): IOrderSuccess;
}

export class AppData implements IAppData{
  protected items: IProductItem[]=[];
  // constructor(protected events: IEvents){}
  constructor(){}
  getCards() {
    return this.items;
  }

  setCards(items: IProductItem[]){
    return this.items = items;
  }

  getCard(id: string): IProductItem;
  getTotal(): number;
  getOrder(): IProductItem[];
  removeFromOrder(id: string): void;
  addToOrder(id: string): void;
  validateForm(form: HTMLElement): void;
  successOrder(order: IOrder): IOrderSuccess;
}