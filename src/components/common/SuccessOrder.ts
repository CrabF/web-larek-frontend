import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccessOrder {
  total: number
}

interface ICloseModal {
  func: ()=> void
}

export class SuccessOrder extends Component<ISuccessOrder>{

  protected successDescription: HTMLElement;
  protected closeButton: HTMLElement;

  constructor(container: HTMLElement, action: ICloseModal){
    super(container);
    this.successDescription = ensureElement('.order-success__description');
    this.closeButton = ensureElement('.order-success__close');

    if(action.func){
      this.closeButton.addEventListener('click', action.func)
    }
  }

  set total(value: number) {
    this.setText(this.successDescription, `Списано ${value}} синапсов`)
  }
}