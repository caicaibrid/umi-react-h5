import setSize from '@/utils/rem';
import { RequestConfig } from '@umijs/max';

import VConsole from 'vconsole';
import config from './utils/config';

// 或者使用配置参数来初始化，详情见文档
new VConsole({ theme: 'dark' });

setSize(); // 初始化设置rem
window.addEventListener('resize', () => {
  setSize();
});

let requestNum = 0;

console.log(config);
export const request: RequestConfig = {
  // Base configuration
  baseURL: config.API_URL,
  timeout: 300000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },

  // Request interceptors
  requestInterceptors: [
    (config: any) => {
      ++requestNum;
      // Add authentication token
      const token = localStorage.getItem('token');
      config.headers = {
        'Content-Type': 'application/json',
        ...config.headers,
        satoken: `${token}`,
      };
      return config;
    },
  ],

  // Response interceptors
  responseInterceptors: [
    (response: any) => {
      --requestNum;
      let data = response.data;
      if (response.status !== 200 && requestNum === 0) {
        // ('Request failed, please try again later');
      }

      return data;
    },
  ],
};
