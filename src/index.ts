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

const events = new EventEmitter();
const container = document.querySelector('.page');
const modalContainer = document.querySelector('#modal-container')
const page = new Page(container as HTMLElement, events);
const modal = new Modal(modalContainer as HTMLElement, events)


const model = new AppData(events)



const api = new LarekApi(Api, Content);




api.getProductList()
.then((res)=>{ 
   model.setCards(res)
})
.catch((err)=> {
  console.log(err)
})





events.on('cards:changed', (items: IProductItem[])=>{
  const cardsArray = items
  .map((item)=>{
    const card = new Card(cloneTemplate('#card-catalog'));
    return card.render(item)
  })
  page.render({
    counter: model.getTotal(),
    catalog: cardsArray
  })
})

// events.on('basket:open', ()=>{

// })

events.on('modal:open', (item)=>{
 
})






























