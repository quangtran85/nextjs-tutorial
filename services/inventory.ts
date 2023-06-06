import { apiClient } from './api';

export interface IBook {
  id: string
  title: string
  author: string
  price: number
}
export interface Paging {
  limit: number;
  skip: number;
}

export const getListBooks = ({limit, skip} : Paging) => {
  return apiClient.getListBooks(limit, skip).then(result => {
      return result;
  })
}
