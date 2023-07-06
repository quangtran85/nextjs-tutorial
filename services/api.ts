export const ApiRoutes = {
  login: '/auth/login',
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

async function apiFetcher(
  url: string,
  init?: RequestInit,
  unauthorizedRetry = true
): Promise<Response> {
  const token = localStorage.getItem('auth.accessToken') ?? ''
  const baseURl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5050'
  const headers: Record<any, any> = {
    ...init?.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  return fetch(`${baseURl}${url}`, { ...init, headers: headers }).then(
    (response) => {
      if (!unauthorizedRetry || response.status != 401) {
        return response
      }

      const refreshToken = localStorage.getItem('auth.refreshToken') ?? ''
      if (!refreshToken) {
        return response
      }

      return apiFetcher(
        '/auth/refresh',
        {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        },
        false
      ).then(async (refreshResponse) => {
        if (!refreshResponse.ok) {
          return response
        }

        const { data } = await refreshResponse.json()
        localStorage.setItem('auth.accessToken', data.accessToken)
        localStorage.setItem('auth.refreshToken', data.refreshToken)

        return apiFetcher(url, init, false)
      })
    }
  )
}

export const ApiClient = {
  login: async (req: LoginRequest): Promise<LoginResponse> => {
    return apiFetcher(
      ApiRoutes.login,
      {
        body: JSON.stringify(req),
        method: 'POST',
      },
      false
    ).then(
      async (result: Response) => {
        if (!result.ok) {
          return Promise.reject({ message: 'Invalid username or password.' })
        }

        const { data } = await result.json()
        return {
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        }
      },
      () => {
        return Promise.reject({ message: 'Unknown error.' })
      }
    )
  },
}
