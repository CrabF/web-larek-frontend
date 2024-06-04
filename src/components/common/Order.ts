import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

type Payment = 'cash' | 'card';

export class Order extends Form{

  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected payment: Payment;

  constructor(container: HTMLElement, events: IEvents){
    super(container)

    this.cardButton = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);

    this.cardButton.addEventListener('click', ()=>{
      this.payment = 'card'
    })

    this.cashButton.addEventListener('click', ()=>{
      this.payment = 'cash'
    })

    set payMethod(value){
      
    }

    set adress(value: string){

    }
  }
}