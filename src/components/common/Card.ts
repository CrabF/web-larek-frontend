import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ICard {
  description: ()=> void;
}

 

export class Card extends Component<IProductItem>  {

  protected cardDescription: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement){
    super(container);

    this.cardDescription = ensureElement<HTMLElement>('.card__description');
    this.cardImage = ensureElement<HTMLImageElement>('.card__image');
    this.cardTitle = ensureElement<HTMLElement>('.card__title');
    this.cardCategory = ensureElement<HTMLElement>('.card__category');
    this.cardPrice = ensureElement<HTMLElement>('.card__price');
  }
  
  set description(){

  }

  set image(){

  }

  set title(){

  }

  set category(){

  }

  set price(){

  }

  set button(){
    
  }
}