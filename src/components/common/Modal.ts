import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModalData {
  content: HTMLElement;
}

export class Modal extends Component<IModalData> {

protected buttonClose: HTMLButtonElement;
protected content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);
    this.content = ensureElement<HTMLElement>('.modal__content', container); 

    this.buttonClose.addEventListener('click', this.close.bind(this));
  }

  set data(cardInfo: HTMLElement) {
    this.content.replaceChildren(cardInfo)
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open')
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close')
  }

  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container
  }
} 