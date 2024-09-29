import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { config } from '../config/AppConfig';

/**
 * http client를 초기화 한다.
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: 'https://lisconne.jp/api',
  responseType: 'json',
  headers: {
    'X-Env-Type': config().envCd,
    'X-Auth-Token': '',
    'user_id': '',
    'co_id': '',
    'rest_id': '',
  },
} as AxiosRequestConfig);


// JWT 토큰을 헤더에 담는 인터셉터 추가
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');

    if (auth) {
      config.headers['user_id'] = auth.userId;
      config.headers['co_id'] = auth.coId;
      config.headers['rest_id'] = auth.restId;
      config.headers['rest_rgn'] = auth.restRgn;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);