import apiClient from './apiClient';

export const getOrderData = async () => {
  return await apiClient({
    method: 'get',
    url: '/mock/order',
    params: {
      offset: 0,
      limit: 50,
      date: '2023-03-08',
    },
  });
};
