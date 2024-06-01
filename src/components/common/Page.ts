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
  protected wrapper: HTMLElement;

  constructor(documentBody: HTMLElement, protected events: IEvents){
    super(documentBody);
    this.basketCounter = ensureElement('.header__basket-counter', this.container) as HTMLElement;
    this.gallery = ensureElement('.gallery', this.container) as HTMLElement;
    this.basket = ensureElement('.header__basket', this.container);
    this.basket.addEventListener('click', ()=>{
      events.emit('basket:open')
    })
    this.wrapper = ensureElement('.page__wrapper', this.container);
  }

    set counter(value: number){
      this.basketCounter.textContent = String(value)
    }

    set catalog(items: HTMLElement[]) {
      this.gallery.replaceChildren(...items)
    }

    set pageWrapperLocked(value: boolean){
      this.toggleClass(this.wrapper, 'page__wrapper_locked', value)
    }    
  }