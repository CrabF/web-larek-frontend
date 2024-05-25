import { IOrder, IOrderSuccess, IProductItem, IProductList } from "../../types";
import { IEvents } from "../base/events";


interface IAppData{
  getCards(): IProductItem[];
  setCards(items: IProductItem[]): void;
  getCard(id: string): IProductItem | undefined;
  getTotal(): number;
  getOrder(): void;
  removeFromOrder(id: string): void;
  addToOrder(card: IProductItem): void;
}

export class AppData implements IAppData{
  protected items: IProductItem[]=[];
  constructor(protected events: IEvents){}

  getCards() {
    return this.items;
  }

  setCards(items: IProductItem[]){
    this.items = items;
    this.events.emit('cards: changed', this.items);
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
      return item.id !== id
    })
  }

  addToOrder(card: IProductItem){
    if(card.selected === false || undefined){
      this.items.push(card)
    }
  }
}