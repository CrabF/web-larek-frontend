import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IForm {
  valid: boolean,
  errors: string[]
}

export class Form<T> extends Component<IForm>{

  protected submitButton: HTMLButtonElement;
  protected spanErrors: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents){
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]',container);
    this.spanErrors = ensureElement<HTMLInputElement>('.form__errors', container);

    this.container.addEventListener('input', (event: Event)=>{
      const field = ((event.target) as HTMLInputElement).name as keyof T;
      const value = ((event.target) as HTMLInputElement).value;
      this.inputChange(field, value)
    })

    this.container.addEventListener('submit', (event: Event)=>{
      event.preventDefault();
      this.events.emit(`${container.name}:submit`);
    })
  }

  inputChange(field: keyof T, value: string){
    this.events.emit(`${(this.container as HTMLFormElement).name}.${String(field)}:changed`, {
      field,
      value
    })
  }

  set valid(value: boolean){
    this.submitButton.disabled = !value
  }

  set errors(text: string){
    this.setText(this.spanErrors, text)
  }

  render(data: Partial<T> & IForm) {
    const {valid, errors, ...inputs} = data;
    super.render({valid, errors});
    Object.assign(this, inputs);
    return this.container
  }
} 