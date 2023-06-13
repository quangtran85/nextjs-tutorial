import { apiClient, OrderRequest } from './api'

export interface IBook {
  id: string
  title: string
  author: string
  price: number
  stock: number
}
export interface Paging {
  limit: number;
  skip: number;
}

export interface Params extends Paging{
  title?: string;
}

export const getListBooks = ({ limit, skip, title }: Params) => {
  return apiClient.getListBooks(limit, skip, title).then((result) => {
    return result;
  });
};

export const checkCoupon = (couponCode: string) => {
  return apiClient.checkCoupon(couponCode)
    .then((response) => {
      return response
    });
};

export const order = ({ items, creditCardNumber, couponCode}: OrderRequest) => {
   return apiClient.order({items, creditCardNumber, couponCode})
     .then((response) => {
       return response
   });
};
