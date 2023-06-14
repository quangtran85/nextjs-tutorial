import { apiClient } from './api';

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

