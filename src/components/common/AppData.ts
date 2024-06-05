import { IOrder, IOrderSuccess, IProductItem, IProductList, Payment } from "../../types";
import { IEvents } from "../base/events";


interface IAppData{
  getCards(): IProductItem[];
  setCards(items: IProductItem[]): void;
  setItemPreview(card: IProductItem): void;
  getTotal(): number;
  inBasket(card: IProductItem): boolean;
  addToBasket(card: IProductItem): void;
  removeFromBasket(card: IProductItem): void;
  clearBasket(): void;
  validateOrder():void;
  successOrder():void;
}

export class AppData implements IAppData{
  protected items: IProductItem[]=[];
  protected order: IOrder = {
    address: '',
    email: '',
    phone: '',
    payment: 'cash',
    total: 0,
    items: []
  }
  protected basket: IProductList = {
    total: 0,
    items: []
  }
  protected itemPreview: IProductItem = null;

  constructor(protected events: IEvents){}

  getCards(): IProductItem[]{
    return this.items;
  }

  setCards(items: IProductItem[]): void{
    this.items = items;
    this.events.emit('cards:changed', this.items);
  }

  setItemPreview(card: IProductItem): void {
    this.items.find((item)=>{
     if(item.id === card.id){
      return this.itemPreview = card
     }
    })
    this.events.emit('preview:changed', this.itemPreview);
  }

  getTotal(): number{
    return this.basket.items.length
  }

  inBasket(card: IProductItem): boolean {
    return this.basket.items.some((item) => {
      return item.id === card.id;
    });
  }

  addToBasket(card: IProductItem): void {
    card.selected = true;
    this.basket.items.push(card)
    this.basket.total += card.price;
    this.events.emit('basket:changed', this.basket);
  }

  removeFromBasket(card: IProductItem): void{
    card.selected = false;
    this.basket.items = this.basket.items.filter((item)=>{
      return item.id !== card.id
    })
    this.basket.total = this.basket.total - card.price;
    this.events.emit('basket:changed', this.basket);
  }

  clearBasket(): void{
    this.basket.items = [];
    this.basket.total = 0;
    this.events.emit('basket:changed', this.basket);
  }

  changePayment(value: Payment){
    this.order.payment = value;
  }

  validateOrder(): void {

  }

  successOrder(): void{

  }
}