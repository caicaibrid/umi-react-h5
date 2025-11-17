import { request } from '@umijs/max';

export const deadline = (data = {}) => {
  return request('/activity/deadline', {
    method: 'GET',
    params: data,
  });
};
