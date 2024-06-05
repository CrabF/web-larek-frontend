import { Form } from "./Form";

export class Contacts extends Form{

  protected phoneInput: HTMLInputElement;
  protected emailInput: HTMLInputElement;

  constructor(container: HTMLFormElement) {
    super(container);
    this.phoneInput = container.elements.namedItem('phone') as HTMLInputElement;
    this.emailInput = container.elements.namedItem('email') as HTMLInputElement;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  };

  set email(value: string) {
    this.emailInput.value = value;
  };
}