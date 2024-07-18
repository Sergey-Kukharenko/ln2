import { defineStore } from 'pinia';
import authApi from '~~/api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref();

  function sendAuth(data: string, byEmail: boolean) {
    return authApi
      .sendAuth(data, byEmail)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        return Promise.reject(e.data.message);
      });
  }

  function registrate(data: { email: string; phone: string; password: string; name: string; gender: 'M' | 'F' }) {
    return authApi
      .registration(data)
      .then(() => {
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e.data.message);
      });
  }

  function sendCode(data: string, byEmail: boolean, code: string) {
    return authApi
      .sendCode(data, byEmail, code)
      .then(() => {
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e.data.message);
      });
  }

  return { user, sendAuth, sendCode, registrate };
});
