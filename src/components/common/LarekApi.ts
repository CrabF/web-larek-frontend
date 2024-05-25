import { IOrder, IProductItem, IProductList, ISuccessfulOrder } from '../../types/index'
import { Api, ApiListResponse } from '../base/api'


interface ILarekApi {
  getProductList: () => Promise<IProductList>; 
  getProductItem: (id: string) => Promise<IProductItem>;
  postOrder: (data: IOrder)=> Promise<ISuccessfulOrder>
}

export class LarekApi extends Api implements ILarekApi{
  constructor(baseUrl: string, options?: RequestInit){
    super(baseUrl, options)
  }
  getProductList(): Promise<IProductList>{
    return this.get<IProductList>('/product')
  }

  getProductItem (id: string): Promise<IProductItem>{
    return this.get<IProductItem>(`/product/${id}`)
  }

  postOrder (data: IOrder): Promise<ISuccessfulOrder>{
    return this.post('/order', data)
  }
}