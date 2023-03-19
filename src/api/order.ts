import apiClient from './apiClient';

export const getOrderData = async (offset: number, date: string) => {
  return await apiClient({
    method: 'get',
    url: '/mock/order',
    params: {
      offset,
      date,
      limit: 50,
    },
  });
};
