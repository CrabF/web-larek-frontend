# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание проекта

### Архитектура приложения поделена на 3 слоя:

В работе используется паттерн проектирования MVP. 

Слой данных Model - хранит и обрабатывает данные, которые приходят от сервера. Основной используемый класс, который содержит все методы - AppData. У класса есть интерфейс IAppData. AppData взаимодействует с основными интерфейсами из types.

Слой отображения View - занимается рендером карточек, модалок, форм и прочих визуальных элементов. Слой представляет собой отдельные классы:  Card, Modal, Form, SuccessOrder, Basket. Слой отображает данные из Model при помощи событий слоя Presenter.

Слой Presenter - является связующим для слоя Model и View. Слой навешивает обработчики с помощью класса EventEmitter и через класс прослойку базового класса APi - LarekApi предоставляет информацию для слоя Model.


#### Основные типы данных в types/index.ts

```typescript

// Интерфейс для отдельной карточки. Все данные, которые приходят с бэка, а также опциональное свойство selected - добавлен ли товар в корзину

export interface IProductItem {
  id: string; // уникальный идентификатор карточки 
  description: string; // описание карточки
  image: string; // изображение карточки
  title: string; // название карточки
  category: string; // название категориия карточки 
  price: number | null; // стоимость карточки товара. Стоимость может прийти нулевая
  selected?: boolean // опциональный параметр. Метка, сообщающая о том, что товар был выбран и помещен в корзину
}

// Интерфейс для корзины или главной страницы. Данные, которые приходят с бэка.

export interface IProductList {
  total: number; // общая стоимость карточек товаров - сумма price каждой карточки
  items: IProductItem[] // Массив карточек товаров
}

// Интерфейс для заказа. Информация, которую заполняет пользователь и затем отправляет на сервер вместе с выбранными товарами из корзины.

export interface IOrder {
  address: string; // адрес пользователя
  email: string; // почтовый адрес пользователя
  phone: string; // номер телефона пользователя
  payment: 'online' | 'cash'; // выбранный пользователем способ оплаты. В интерфейсе View - Онлайн или При получении
  total: number; // общая стоимость товаров - сумма price отдельных карточек
  items: string[] // массив с id конкретных карточек товаров, которые были выбраны и помещены в корзину
}

// Интерфейс для успешного заказа. После заполнения всех данных о пользователе и выборе товаров в корзину отправляется Post запрос на бэк с объектом типа IOrder. В ответ ожидается получить объект с информацией об успешном выполнении заказа

export interface IOrderSuccess {
  id: string; // уникальный идентификатор выполненного заказа
  total: number // общая стоимость всех карточек товаров, которые были отправлены на сервер
}

```

### Описание классов из слоя Model

Основной и единственный класс - **AppData**. Класс типизирован интерфейсом *IAppData*. Класс содержит все основные методы, требуемые для хранения и обработки информации, получаемой от сервера. Класс будет наследоваться в основном файле index.ts для взаимодействия с другими слоями.

В классе присутствуют такие методы:

1. **getCards** - метод требуется для отображения на Главной всех карточек товаров. Метод без аргументов. Ожидается, что метод возвращает объект типа *IProductItem[]*, который содержит в себе массив всех карточек с информацией по каждой. 

2. **getCard** - метод требуется для отображения одной карточки. Аргументом метода выступает *id* карточки типа *string*, ожидается, что метод вернет объект типа *IProductItem*, содержащий всю информацию по конкретной карточке или *underfined*. 

3. **getTotal** - метод требуется для отображения количества товаров в корзине на Главной странице. Метод без аргументов. Ожидается, что метод вернет количество всех товаров в корзине.

4. **getOrder** - метод требуется для получения информации о товарах в корзине. Метод без аргументов. Не важно, что возвращает метод.

5. **removeFromOrder** - метод требуется для удаления карточки из корзины. Аргумент метода *id* карточки типа *string*. Не важно, что возвращает метод.

6. **addToOrder** - метод требуется для добавления карточки в корзину. Аргумент метода *id* карточки типа *string*.  Не важно, что возвращает метод.

7. **setCards** - метод требуется для передачи данных от сервера общему классу Model для дальнейшего взаимодействия с полученными данными. Аргумент метода *items* типа *IProductItem[]* - массив с информацией о карточках. Не важно, что возвращает метод.


### Описание классов из слоя Presenter

Класс **LarekApi** - является наследником базового класса **Api**. Класс работает с конкретными типами данных, которые ожидаются от сервера. Типы данных представлены, как в общих типах types/index.ts, так и отдельным интерфейсов *ILarekAPi*.

Интерфейс *ILarekAPi* типизирует основные методы класса **LarekApi**. К основным методам относятся:

1. **getProductList** - метод требуется для получения массива карточек товаров - *items* типа *IProductItem[]* и их общего количества - *total* типа *number*. Используется на Главной странице и в корзине. Метод без аргументов. Ожидается, что метод, используя базовый метод **get** класса **Api**, вернет объект *Promise* с типом данных *<IProductList>*, содержащий массив карточек и их общее количество.

2. **getProductItem** - метод требуется для получения объекта конкретной карточки товара. Используется для различных вариаций отображения карточки, например в классе **Modal** слоя **View**. Аргументом метода является *id* карточки типа *string*. Ожидается, что метод, используя базовый метод **get** класса **Api**, вернет объект карточки *Promise* с типом данных *<IProductItem>*, содержащем информацию о карточке.

3. **postOrder** - метод требуется для отправки на сервер заказа конкретного пользователя со всеми данными как о заказа, так и о введенной информации пользователя. Используется при отображении финального экрана об успешной покупке в слое **View** класса **Modal**. Аргументом метода является объект *data* - содержит всю информацию о помещенных в корзину карточках, а также инфориации пользователя типа *IOrder*. Ожидается, что метод, используя базовый метод **post** класса **Api**, вернет объект *Promise* с типом данных *ISuccessfulOrder*, содержащий *id* типа *string* сформированного заказа и общую сумму покупки *total* типа *number*.


### Описание классов из слоя View
  



#### Состояния приложения(событийная модель)

*cards:changed* - вызывается при изменении списка карточек на Главной
*basket:changed* - вызывается при изменении количества товаров в корзине
*basket:open* - вызывается при открытии корзины
*modal:open* - вызывается при выборе карточки и открытии ее модалки
*modal:close* - вызывается при закрытии модалки карточки
*order:selected* - вызывается при нажатии в корзину в модалке карточки
*order:unselected* - вызывается при нажатии Убрать из корзины в модалке карточки
*orderInfo:open* - вызывается при нажатии Оформить в корзине
*orderInfo:changed* - вызывается при нажатии Далее в форме заполнения информации пользователем. Включает в себя валидацию полей
*order:success* - вызывается при нажатии на Оплатить на последнем экране формы при отправке всех данных о заказе на сервер.
*order:new* - вызывается вслед за *order:success* и отчищает корзину