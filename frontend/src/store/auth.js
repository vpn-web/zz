import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';
import axios from '@/utils/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', user: null }),
  actions: {
    login(token) {
      this.token = token;
      const payload = jwt_decode(token);
      this.user = { username: payload.username, isAdmin: payload.isAdmin };
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = '';
      this.user = null;
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem('token');
    }
  }
});
