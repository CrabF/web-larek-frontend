import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IOpenPrewiev {
  onClick: (event: MouseEvent)=> void;
}

export class Card extends Component<IProductItem>  {

  protected cardDescription?: HTMLElement;
  protected cardImage?: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory?: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardButton?: HTMLButtonElement;
  protected cardIndex?: HTMLElement;

  constructor(container: HTMLElement, action?: IOpenPrewiev){
    super(container);

    this.cardDescription = container.querySelector('.card__text');
    this.cardImage = container.querySelector('.card__image');
    this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
    this.cardCategory = container.querySelector('.card__category');
    this.cardPrice = ensureElement<HTMLElement>('.card__price', container);
    this.cardButton = container.querySelector('.card__button');
    this.cardImage = container.querySelector('.card__image');
    this.cardIndex = container.querySelector('.basket__item-index');

    if(action?.onClick && this.button){
      this.cardButton.addEventListener('click', action.onClick)
    } else {
      this.container.addEventListener('click', action.onClick);
    }
  }
  
  set description(text: string){
    this.setText(this.cardDescription, text)
  }

  set image(img: string){
    this.setImage(this.cardImage, img, img)
  }

  set index(value: number){
    this.setText(this.cardIndex, value)
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

  set price(value: number | null){
    this.setText(this.cardPrice, (value) ? `${value}  синапсов`: 'Бесценно')
    this.hideButton(value)
  }

  hideButton(value: number | null){
    if(value === null){ 
      if(this.cardButton){
        this.cardButton.remove()
      } 
    }
  }

  set button(text: string){
    this.setText(this.cardButton, text)
  }
}