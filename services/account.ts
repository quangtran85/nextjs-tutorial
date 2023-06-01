import { apiClient } from './api';
import { login } from './auth';

export interface ICustomer {
  username: string;
  password: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isMember?: boolean;
}

export const createAccount = (data: ICustomer)=> {
  return apiClient.register(data).then(async() => {
    return await login({
        'username': data.username,
        'password': data.password,
    });
  });
}
