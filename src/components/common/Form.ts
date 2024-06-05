import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IForm {
  func: (event: MouseEvent)=> void;
}

export class Form extends Component<IForm>{

  protected formTitle?: HTMLElement;
  protected orderButtons?: HTMLButtonElement;
  protected orderField: HTMLElement;
  protected spanField: HTMLInputElement;
  protected formInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  protected spanErrors: HTMLInputElement;

  constructor(container: HTMLElement, action?: IForm){
    super(container);

    this.formTitle = container.querySelector('.modal__title');
    this.orderButtons = container.querySelector('.order__buttons');
    this.formInput = ensureElement<HTMLInputElement>('.form__input', container);
    this.submitButton = ensureElement<HTMLButtonElement>('.order__button',container);
    this.spanErrors = ensureElement<HTMLInputElement>('.form__errors', container);

    this.submitButton.addEventListener('click', action.func)

    
    // this.orderButtons.addEventListener('click', (event) => {
    //   if((event.target as HTMLElement).tagName === 'BUTTON'){
    //     this.toggleClass((event.target as HTMLElement), 'button_alt-active');
    //   }
    
    //   console.log(event.target)
    // });
  }

  set title(value: string){
    this.setText(this.formTitle, value);
  }

  set input(text: string){
    this.setText(this.formInput, text)
  }

  set button(text: string){
    this.setText(this.submitButton, text) 
  }

  set error(text: string){
    this.setText( this.spanErrors, text)
  }
} 