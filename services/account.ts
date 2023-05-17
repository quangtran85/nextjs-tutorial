export interface ICustomer {
  firstName: string
  lastName: string
  userName: string
  password: string
  email?: string
}

export const useCreateCustomer = (data: ICustomer) => {
  return data
}
