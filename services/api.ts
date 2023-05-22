export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
}

async function fetcher(url: string, init?: RequestInit, unauthorizedRetry = true) {
  const token = localStorage.getItem('auth.accessToken') ?? ''
  const baseURl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
  const headers: Record<any, any> = {
    ...init?.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  return fetch(`${baseURl}${url}`, { ...init, headers: headers }).then(response => {
    if (!unauthorizedRetry || response.status != 401) {
      return response
    }

    const refreshToken = localStorage.getItem('auth.refreshToken') ?? ''
    if (!refreshToken) {
      return response
    }

    return fetcher('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refreshToken: refreshToken
      }),
    }, false).then(async refreshResponse => {
      if (!refreshResponse.ok) {
        return response
      }

      const { data } = await refreshResponse.json();
      localStorage.setItem("auth.accessToken", data.accessToken)
      localStorage.setItem("auth.refreshToken", data.refreshToken)

      return fetcher(url, init, false)
    })
  });
}

export const apiClient = {
  login: async (req: LoginRequest) => {
    return fetcher('/auth/login', {
      body: JSON.stringify(req),
      method: 'POST',
    }, false).then(async result => {
      if (!result.ok) {
        return Promise.reject({
          message: 'Invalid username or password'
        });
      }

      const { data } = await result.json();
      return {
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
      } as LoginResponse
    }, () => {
      return Promise.reject({
        message: 'Unknown error'
      });
    })
  },

  register: async (req: RegistrationRequest) => {
    await fetcher('/account/customers/register', {
      body: JSON.stringify(req),
      method: 'POST',
    }, false)
  },

  getProfile: async () => {
    const result = await fetcher('/account/customers/profile')
    const { data } = await result.json()

    return {
      id: data?.id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      username: data?.username,
      email: data?.email,
    } as Customer
  }
};
