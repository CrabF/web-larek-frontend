import { IProductItem, IProductList, ISuccessfulOrder } from '../../types/index'
import { Api, ApiListResponse } from '../base/api'


interface ILarekApi {
  getProductItem: (id: string) => Promise<IProductItem>;
  getProductList: () => Promise<IProductList>; 
  getOrderList: () => Promise<ISuccessfulOrder>
}