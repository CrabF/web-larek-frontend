import { IProductItem, IProductList, ISuccessfulOrder } from '../../types/index'
import { Api, ApiListResponse } from '../base/api'


interface ILarekApi {
  // getProductItem: (id: string) => Promise<IProductItem>;
  getProductList: () => Promise<IProductList>; 
  // postOrder: ()=> Promise<>
}

export class LarekApi extends Api implements ILarekApi{
  constructor(baseUrl: string, options?: RequestInit){
    super(baseUrl, options)
  }
  getProductList(): Promise<IProductList>{
    return this.get<IProductList>('/product/')
  }
}