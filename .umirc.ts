import { defineConfig } from '@umijs/max';
import pxtorem from 'postcss-pxtorem';

export default defineConfig({
  antd: {},
  model: {},
  request: {
    dataField: '',
  },
  title: 'Block Blast!',
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/loading.js', async: true },
  ],
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  ignoreMomentLocale: true,
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    antd: true,
    default: 'en-US',
    baseSeparator: '-',
    useLocalStorage: true,
    baseNavigator: true,
  },
  routes: [
    {
      path: '/',
      redirect: '/demo',
    },
    {
      name: '首页',
      path: '/demo',
      component: './Demo',
    },
  ],
  // https: {
  //   cert: './cert.pem',
  //   key: './key.pem',
  // },
  npmClient: 'pnpm',
  tailwindcss: {},
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100, // 根元素字体大小，根据设计稿调整
      propList: ['*'], // 需要转换的属性列表
      selectorBlackList: [], // 忽略的选择器
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
    }),
  ],
});
