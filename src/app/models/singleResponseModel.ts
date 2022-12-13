import { ResponseModel } from './responseModel';

export interface SingleResponseModel<T> extends ResponseModel {
  data: T
}
//datayı list yerine tek bir data şeklinde getir.
