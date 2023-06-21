import { apiClient, OrderRequest, PromotionRequest } from './api'

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
  inStock?: boolean;
}

export interface BookRequest {
  title: string;
  author: string;
  price: number;
  stock: number;
  reOrderThreshold: number;
}

export interface CreateBookResponse {
  bookId: string;
}

export interface EditBookResponse {
  success: boolean;
}

export const getListBooks = ({ limit, skip, title }: Params) => {
  return apiClient.getListBooks(limit, skip, title).then((result) => {
    return result;
  });
};

export const getStockBooks = async ({ limit, skip, title }: Params) => {
  return apiClient.getListBooks(limit, skip, title, true ).then((result) => {
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

export const createBook = (bookData: BookRequest) => {
  return apiClient.createBook(bookData).then((response) => {
    return response as CreateBookResponse;
  });
};

export const editBook = (bookId: string, bookData: BookRequest) => {
  return apiClient.editBook(bookId, bookData).then((response) => {
    return response as EditBookResponse;
  });
};

export const fetchBookData = async (bookId: string) => {
  return await apiClient.getBookById(bookId).then((response) => {
      return response
  })
};

export const createPromotion = (promotionData: PromotionRequest) => {
  return apiClient.createPromotion(promotionData).then((response) => {
    return response
  });
};

