const baseUrl = {
  development: {
    API_URL: 'https://horizon-dev.afafb.com', // API地址
  },
  production: {
    API_URL: 'https://horizon.afafb.com', // API地址
  },
};

export default baseUrl[process.env.UMI_ENV as keyof typeof baseUrl];
