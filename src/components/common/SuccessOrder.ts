import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccessOrder {
  total: number
}

interface ICloseModal {
  onClick: ()=> void
}

export class SuccessOrder extends Component<ISuccessOrder>{

  protected successDescription: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, action: ICloseModal){
    super(container);
    this.successDescription = ensureElement<HTMLElement>('.order-success__description', container);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);

    if(action?.onClick){
      this.closeButton.addEventListener('click', action.onClick)
    }
  }

  set total(value: number) {
    this.setText(this.successDescription, `Списано ${value} синапсов`)
  }
}