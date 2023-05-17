export interface IBook {
  title: string
  author: string
  price: number
}

export const useGetBookInventory = (data: IBook) => {
  return data
}
