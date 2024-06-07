import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IOpenPrewiev {
  func: (event: MouseEvent)=> void;
}

export class Card extends Component<IProductItem>  {

  protected cardDescription?: HTMLElement;
  protected cardImage?: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory?: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardButton?: HTMLButtonElement;
  protected cardId: string;

  constructor(container: HTMLElement, action?: IOpenPrewiev){
    super(container);

    this.cardDescription = container.querySelector('.card__text');
    this.cardImage = container.querySelector('.card__image');
    this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
    this.cardCategory = container.querySelector('.card__category');
    this.cardPrice = ensureElement<HTMLElement>('.card__price', container);
    this.cardButton = container.querySelector('.card__button');
    this.cardImage = container.querySelector('.card__image');

    if(action?.func && this.button){
      this.cardButton.addEventListener('click', action.func)
    } else {
      this.container.addEventListener('click', action.func);
    }
  }
  
  set description(text: string){
    this.setText(this.cardDescription, text)
  }

  set image(img: string){
    this.setImage(this.cardImage, img, img)
  }

  get title(): string{
    return this.cardTitle.textContent || "";
  }

  set title(text: string){
    this.setText(this.cardTitle, text)
  }

  set category(text: string){
    this.setText(this.cardCategory, text);
  }

  set categoryClass(categoryClassName: string){
    const secondClass = this.cardCategory.classList[1]
    switch (categoryClassName){
      case 'хард-скил': this.cardCategory.classList.replace(secondClass, 'card__category_hard')
        break
      case 'другое': this.cardCategory.classList.replace(secondClass, 'card__category_other')
        break
      case 'дополнительное': this.cardCategory.classList.replace(secondClass, 'card__category_additional')
        break
      case 'кнопка': this.cardCategory.classList.replace(secondClass, 'card__category_button')
        break
      case 'софт-скил': this.cardCategory.classList.replace(secondClass, 'card__category_soft')
        break
    }
  }

  set price(value: number){
    this.setText(this.cardPrice, (value) ? `${value}  синапсов`: 'Бесценно')
  }

  set button(text: string){
    this.setText(this.cardButton, text)
  }

  set id(id: string){
    this.cardId = id
  } 
}