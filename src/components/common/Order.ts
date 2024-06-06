import { IOrderForm, Payment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";


export class Order extends Form<IOrderForm>{

  protected addressInput: HTMLInputElement;
  protected payCard: HTMLButtonElement;
  protected payCash: HTMLButtonElement;
  

  constructor(container: HTMLFormElement, events: IEvents){
    super(container, events)

    this.payCard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', container);
    this.payCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', container);

    this.addressInput = ensureElement<HTMLInputElement>('.form__input', container)

    this.payCard.addEventListener('click', ()=>{
      this.payMethod = 'card'
      this.inputChange('payment', 'card');
    })

    this.payCash.addEventListener('click', ()=>{
      this.payMethod = 'cash'
      this.inputChange('payment', 'cash');
    })
  }

  set payMethod(value: Payment){
    this.payCard.classList.toggle('button_alt-active', value === 'card');
    this.payCash.classList.toggle('button_alt-active', value === 'cash')
  }

  set address(value: string){
    this.addressInput.value = value;
  }
}