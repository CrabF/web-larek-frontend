import { IOrderForm, Payment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";


export type IButtonText = {
  data: string
}

export class Order extends Form<IOrderForm>{

  protected containerButtons: HTMLElement;
  protected payment: Payment;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents){
    super(container, events)

    this.containerButtons = ensureElement('.order__buttons', container)
    this.addressInput = ensureElement<HTMLInputElement>('.form__input', container)

    this.containerButtons.addEventListener('click', (event) => {
      if((event.target as HTMLElement).tagName === 'BUTTON'){
        this.toggleClass((event.target as HTMLElement), 'button_alt-active');
        const buttonText: IButtonText = {
          data: (event.target as HTMLElement).textContent
        }
        events.emit('payment:changed', buttonText)
      }
    });
  }

  // set payMethod(value){
  //   this.payment = value
  // }

  set address(value: string){
    this.addressInput.value = value;
  }
}