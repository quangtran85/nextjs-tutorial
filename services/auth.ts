import { signal } from '@preact/signals-core';
import { apiClient, Customer, LoginRequest } from './api';

const accessTokenKey = 'auth.accessToken';
const refreshTokenKey = 'auth.refreshToken';
const userInfoKey = 'auth.user';

interface State {
  profile?: Customer;
}

export const state = signal<State>({});

export const login = (req: LoginRequest) => {
  return apiClient.login(req).then(token => {
    localStorage.setItem(accessTokenKey, token.accessToken)
    localStorage.setItem(refreshTokenKey, token.refreshToken)
    return apiClient.getProfile().then(profile => {
      state.value.profile = profile
      localStorage.setItem(userInfoKey, JSON.stringify(profile))
    })
  });
}

export const logout = () => {
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey)
  localStorage.removeItem(userInfoKey)
  state.value.profile = undefined
  return Promise.resolve()
};

export const init = () => {
  const profileString = localStorage.getItem(userInfoKey);
  if (!profileString) {
    return;
  }

  state.value.profile = JSON.parse(profileString);
};
