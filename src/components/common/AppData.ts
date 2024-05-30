import { IOrder, IOrderSuccess, IProductItem, IProductList } from "../../types";
import { IEvents } from "../base/events";


interface IAppData{
  getCards(): IProductItem[];
  setCards(items: IProductItem[]): void;
  initModal(card: IProductItem): void;
  getTotal(): number;
  addToBasket(card: IProductItem): void;
  removeFromBasket(card: IProductItem): void;
  clearBasket(): void;
  validateOrder():void;
  successOrder():void;
}

export class AppData implements IAppData{
   items: IProductItem[]=[];
   order: IOrder = {
    address: '',
    email: '',
    phone: '',
    payment: 'online',
    total: 0,
    items: []
  }
  protected basket: IProductList = {
    total: 0,
    items: []
  }
  protected modal: IProductItem = null;

  constructor(protected events: IEvents){}
  // constructor(){}

  getCards() {
    return this.items;
  }

  setCards(items: IProductItem[]){
    this.items = items;
    this.events.emit('cards:changed', this.items);
  }

  initModal(card: IProductItem) {
    this.items.find((item)=>{
     if(item.id === card.id){
      return this.modal = card
     }
    })
    this.events.emit('modal:open', this.modal);
  } 

  getTotal(){
    return this.items.length
  }

  addToBasket(card: IProductItem) {
    card.selected = true;
    this.basket.items.push(card)
    this.basket.total += card.price;
    this.events.emit('basket:changed', this.basket);
  }

  removeFromBasket(card: IProductItem){
    card.selected = false;
    this.basket.items = this.basket.items.filter((item)=>{
      return item.id !== card.id
    })
    this.events.emit('basket:changed', this.basket);
  }

  clearBasket(){
    this.basket.items = [];
    this.basket.total = 0;
    this.events.emit('basket:changed', this.basket);
  }

  validateOrder() {

  }

  successOrder(){

  }
}