import setSize from '@/utils/rem';
import { RequestConfig } from '@umijs/max';

setSize(); // 初始化设置rem
window.addEventListener('resize', () => {
  setSize();
});

// 运行时配置
export const request: RequestConfig = {
  timeout: 30000,
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      const url = config.url.concat('?token = 123');
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      console.log('响应数据：', data);
      return response;
    },
  ],
};
