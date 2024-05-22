import { getToastState } from '@store';
import axios from 'axios';

export const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

const { showToast } = getToastState();
clientApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers['Bearer'] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientApi.interceptors.response.use(
  async function (res) {
    if (res && res.data && res.data.status) return res.data.data;
    else return res.data;
  },
  async function (error) {
    if (error?.response?.data) {
      showToast({ title: error.response.data.mess || 'Đường truyền không ổn định vui lòng thử lại sau', severity: 'error' });
    }
  }
);
