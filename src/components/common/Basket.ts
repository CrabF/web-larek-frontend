import { createElement, ensureElement } from "../../utils/utils";
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
  // protected basketItemIndex: HTMLElement;

  constructor(container: HTMLElement,events: IEvents){
    super(container);

    this.basketButton = ensureElement('.basket__button', container);
    this.basketPrice = ensureElement('.basket__price', container);
    this.basketItems = ensureElement('.basket__list', container);
    // this.basketItemIndex = document.querySelector('.basket__item-index');

    this.basketButton.addEventListener('click', ()=>{
      events.emit('order:selected')
    })

    this.items = [];
  }

  // set index(value: number){
  //   this.setText(this.basketItemIndex, value)
  // }

  set items(value: HTMLElement[]){
    if(value.length) {
      this.basketItems.replaceChildren(...value);
      this.basketButton.removeAttribute('disabled')
    } else {
      this.basketItems.replaceChildren(createElement('h1', {
        textContent: 'Пусто'
      }))
      this.basketButton.setAttribute('disabled', '')
    }

  }
  set total(value: number){
    this.setText(this.basketPrice, `${value} синапсов`)
  }
}