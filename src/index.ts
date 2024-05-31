import './scss/styles.scss';
import {AppData} from './components/common/AppData';
import {LarekApi} from './components/common/LarekApi';
import { EventEmitter } from './components/base/events'

import {API_URL as Api, CDN_URL as Content} from './utils/constants'
import { Page } from './components/common/Page';
import { Card } from './components/common/Card';
import { cloneTemplate } from './utils/utils';
import { IProductItem } from './types';
import { Modal } from './components/common/Modal';

//Поиск нужных элементов
const container = document.querySelector('.page');
const modalContainer = document.querySelector('#modal-container')

//Добавление наследников основных классов
const events = new EventEmitter();
const page = new Page(container as HTMLElement, events);
const modal = new Modal(modalContainer as HTMLElement, events)
const model = new AppData(events)
const api = new LarekApi(Api, Content);


//Получение массива с сервера
api.getProductList()
.then((res)=>{ 
   model.setCards(res)
})
.catch((err)=> {
  console.log(err)
})

//Обработка карточек с сервера. 
//Получили массив, создали под каждый объект из массива карточку и навесили обработчик на каждую карточку
events.on('cards:changed', (items: IProductItem[])=>{
  const cardsArray = items
  .map((item)=>{
    const card = new Card(cloneTemplate('#card-catalog'), {
      func: ()=>{
        events.emit('card:selected', item); 
      }
    });
    return card.render(item)
  })
  page.render({
    counter: model.getTotal(),
    catalog: cardsArray
  })
})

events.on('card:selected', (item: IProductItem)=>{
  model.setItemPreview(item);
  modal.open()
  console.log('11')
})