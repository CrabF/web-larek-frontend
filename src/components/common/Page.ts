import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface IPage {
  counter: number;
  catalog: HTMLElement[];
} 

export class Page extends Component<IPage> {
  protected basketCounter: HTMLElement;
  protected gallery: HTMLElement;
  protected basket: HTMLElement;

  constructor(documentBody: HTMLElement, protected events: IEvents){
    super(documentBody);
    this.basketCounter = ensureElement<HTMLElement>('.header__basket-counter');
    this.gallery = ensureElement<HTMLElement>('.gallery');
    this.basket = ensureElement<HTMLElement>('.header__basket');
    this.basket.addEventListener('click', ()=>{
      events.emit('basket:open')
    })
    }

    set counter(value: number) {

    }

    set catalog(items: HTMLElement[]) {

    }
  }

 