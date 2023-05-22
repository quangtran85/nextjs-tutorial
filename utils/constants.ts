export const constants = {
  APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL||'http://localhost:3000',
  LOCAL_STORAGE_KEY: {
    userInfo: "_u",
    accessToken: "_a",
    expiredTime: "_e",
    refreshToken: "_r"
  },
};
