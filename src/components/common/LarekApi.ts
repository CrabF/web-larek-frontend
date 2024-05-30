import { IOrder, IProductItem, IProductList, IOrderSuccess } from '../../types/index'
import { Api } from '../base/api'


interface ILarekApi {
  getProductList: () => Promise<IProductItem[]>; 
  getProductItem: (id: string) => Promise<IProductItem>;
  postOrder: (data: IOrder)=> Promise<IOrderSuccess>
}

export class LarekApi extends Api implements ILarekApi{
  constructor(baseUrl: string, readonly cdn:string, options?: RequestInit){
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProductList(): Promise<IProductItem[]>{
    return this.get('/product').then((data: IProductList) =>{
      return data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    })
  }
        
  getProductItem(id: string): Promise<IProductItem>{
    return this.get(`/product/${id}`).then((item: IProductItem) => {
      return {
        ...item,
        image: this.cdn + item.image
      }
    })
  } 

  postOrder (data: IOrder): Promise<IOrderSuccess>{
    return this.post('/order', data)
  }
}