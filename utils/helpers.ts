import { constants } from '../utils/constants'
import moment from 'moment'

const helpers = {
  storeAuthToken: (token, refreshToken) => {
    const time = moment();
    const lifeTime = process.env.NEXT_PUBLIC_ACCESS_TOKEN_LIFETIME || 3600;
    time.add(lifeTime, "seconds");
    localStorage.setItem(constants.LOCAL_STORAGE_KEY.expiredTime, String(time.unix()));
    if (refreshToken) {
      localStorage.setItem(constants.LOCAL_STORAGE_KEY.refreshToken, refreshToken);
    }
    return localStorage.setItem(constants.LOCAL_STORAGE_KEY.accessToken, token);
  },
  getAuthToken: () => {
    return localStorage.getItem(constants.LOCAL_STORAGE_KEY.accessToken);
  },
  storeUserLogged: (data) => {
    return localStorage.setItem(constants.LOCAL_STORAGE_KEY.userInfo, JSON.stringify(data));
  },
  getUserLogged: () => {
    return JSON.parse(<string>localStorage.getItem(constants.LOCAL_STORAGE_KEY.userInfo)) ?? '';
  },
  userLogout: () => {
    localStorage.clear();
    window.location.href = '/';
  },
};

export default helpers;
