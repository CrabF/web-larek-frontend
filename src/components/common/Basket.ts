import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IBasket {
  items: HTMLElement[],
  total: number
}

export class Basket extends Component<IBasket> {

  protected basketButton: HTMLElement;
  protected basketPrice: HTMLElement;
  protected basketItems: HTMLElement;
  protected basketItem: HTMLElement

  constructor(container: HTMLElement,events: IEvents){
    super(container);

    this.basketButton = ensureElement('.basket__button', container);
    this.basketPrice = ensureElement('.basket__price', container);
    this.basketItems = ensureElement('.basket__list', container);

    this.basketButton.addEventListener('click', ()=>{
      events.emit('order:selected')
    })
  }

  set items(value: HTMLElement[]){
    this.basketItems.replaceChildren(...value);
    this.basketButton.removeAttribute('disabled')

  }
  set total(value: number){
    this.setText(this.basketPrice, `${value} синапсов`)
  }
}