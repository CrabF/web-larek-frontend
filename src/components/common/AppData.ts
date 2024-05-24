import { IOrder, IOrderSuccess, IProductItem, IProductList } from "../../types";
import { IEvents } from "../base/events";


export interface IAppData{
  getCards(): IProductItem[];
  setCards(items: IProductItem[]): void;
  getCard(id: string): IProductItem | undefined;
  getTotal(): number;
  getOrder(): void;
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

  getCard(id: string) {
    return this.items.find((item)=>{
     return item.id === id
    })
  }

  getTotal(){
    return this.items.length
  }

  getOrder() {
     this.items.filter((item, index, arr)=>{
      if(item.selected){
        arr.push(item)
      }
      return arr
    })
  }

  removeFromOrder(id: string){
     this.items = this.items.filter((item)=>{
      console.log(item)
      return item.id !== id
    })
  }


  addToOrder(id: string): void;
  validateForm(form: HTMLElement): void;
  successOrder(order: IOrder): IOrderSuccess;
}