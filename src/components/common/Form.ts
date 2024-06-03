import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IForm {

}

export class Form extends Component<IForm>{

  protected formTitle?: HTMLElement;
  protected orderButtons?: HTMLButtonElement;
  protected orderField: HTMLElement;
  protected spanField: HTMLInputElement;
  protected formInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  protected spanErrors: HTMLInputElement;

  constructor(container: HTMLElement){
    super(container);

    this.formTitle = container.querySelector('.modal__title');
    this.orderButtons = container.querySelector('.order__buttons');
    
    this.orderButtons.addEventListener('click', (event) => {
      (event.target as Element).classList.add('active') ;
    });
  }

  set title(value: string){
    this.setText(this.formTitle, value);
  }

  

} 