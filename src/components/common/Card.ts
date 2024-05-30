import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

// interface ICard {
//   description: ()=> void;
// }

 
export class Card extends Component<IProductItem>  {

  protected cardDescription?: HTMLElement;
  protected cardImage?: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory?: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardButton?: HTMLButtonElement;
  protected cardId: string;

  constructor(container: HTMLElement){
    super(container);

    this.cardDescription = container.querySelector('.card__text');
    this.cardImage = container.querySelector('.card__image');
    this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
    this.cardCategory = document.querySelector('.card__category');
    this.cardPrice = ensureElement<HTMLElement>('.card__price', container);
    this.cardButton = container.querySelector('.card__button');
    this.cardImage = container.querySelector('.card__image')
  }
  
  set description(text: string){
    this.setText(this.cardDescription, text)
  }

  set image(img: string){
    this.setImage(this.cardImage, img, this.cardTitle as string)
  }

  set title(text: string){
    this.setText(this.cardTitle, text)
  }

  set category(text: string){
    this.setText(this.cardCategory, text)
  }

  set price(value: number){
    this.setText(this.cardCategory, value)
  }

  set button(text: string){
    this.setText(this.cardButton, text)
  }

  set id(id: string){
    this.cardId = id
  } 
}