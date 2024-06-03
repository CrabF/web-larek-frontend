import './scss/styles.scss';
import {AppData} from './components/common/AppData';
import {LarekApi} from './components/common/LarekApi';
import { EventEmitter } from './components/base/events'

import {API_URL as Api, CDN_URL as Content} from './utils/constants'
import { Page } from './components/common/Page';
import { Card } from './components/common/Card';
import { cloneTemplate } from './utils/utils';
import { IProductItem, IProductList } from './types';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';

//Поиск нужных элементов
const container = document.querySelector('.page');
const modalContainer = document.querySelector('#modal-container'); 
const cardBasket = document.querySelector('#card-basket');

//Добавление наследников основных классов
const events = new EventEmitter();
const page = new Page(container as HTMLElement, events);
const modal = new Modal(modalContainer as HTMLElement, events)
const model = new AppData(events)
const api = new LarekApi(Api, Content);
const basket = new Basket(cloneTemplate('#basket'), events)



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
//Рендер страницы с информацией с сервера
  page.render({
    counter: model.getTotal(),
    catalog: cardsArray
  })
})

//Если на карточку на странице кликнули, то в модель передается объект карточки
events.on('card:selected', (item: IProductItem)=>{
  model.setItemPreview(item); 
})

//Открытие превью карточки, если она была выбрана
events.on('preview:changed', (item: IProductItem)=>{
  const card = new Card(cloneTemplate('#card-preview'), {
    func: ()=>{
      if(model.inBasket(item)){
        model.removeFromBasket(item);
        card.button = 'В корзину'
      } else {
        model.addToBasket(item);
        card.button = 'Удалить из корзины'
      }
    }
  })
  card.button = model.inBasket(item)? 'Удалить из корзины':'В корзину';
//Рендерим модалку, а внутрь передаем элемент карточки - зарендерив его 
  modal.render({
    data: card.render(item)
  })
})

//Если модалка открыта, скролл страницы задизейблен
events.on('modal:open', ()=>{
  page.pageWrapperLocked = true
})

//Если модалка закрыта, скролл страницы работает
events.on('modal:close', ()=>{
  page.pageWrapperLocked = false
})

//Открытие корзины
events.on('basket:open', ()=>{
  modal.render({
    data: basket.render()
  })
})

//Содержиоме корзины поменялось
events.on('basket:changed', (itemList: IProductList)=>{
  console.log(itemList)
  page.counter = model.getTotal();
  const cardsArray = itemList.items.map((item)=>{
    const card = new Card((cloneTemplate('#card-basket')), {
      func: ()=>{
        model.removeFromBasket(item);
      }
    });
    return card.render(item)
  })
  basket.items = cardsArray;
  basket.total = itemList.total;
})