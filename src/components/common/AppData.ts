import { IOrder, IOrderForm, IProductItem, IProductList, Payment } from "../../types";
import { IEvents } from "../base/events";

type IFormErrors = Partial<Record<keyof IOrderForm, string>>

export class AppData {
  protected items: IProductItem[]=[];
  order: IOrder = {
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

  formErrors: IFormErrors = {}

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

  changePayment(value: Payment): void{
    this.order.payment = value;
  }

  setFieldValue(field: keyof IOrderForm, value: string): void{
    if(field === 'payment'){
      this.changePayment(value as Payment)
    } else {
      this.order[field] = value
    }

    if(this.order.payment && this.validateOrder()){
      this.order.total = this.basket.total;
      this.order.items = this.basket.items.map(item => item.id);
      this.events.emit('order:ready', this.order)
    }
  }

  validateOrder(): boolean {
    const errors: typeof this.formErrors = {};

    if(!this.order.payment){
      errors.payment = 'Способ оплаты не был выбран'
    }

    if(!this.order.address){
      errors.address = 'Введите адрес'
    }

    if(!this.order.phone){
      errors.phone = 'Введите номер телефона'
    }

    if(!this.order.email){
      errors.email = 'Введите email'
    }

    this.formErrors = errors;
    this.events.emit('formErrors:changed', this.formErrors)

    return Object.keys(errors).length === 0
  } 
}