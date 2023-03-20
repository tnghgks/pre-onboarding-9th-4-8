import apiClient from './apiClient';

export const getOrderData = async (offset: number, date: string | null) => {
  return await apiClient({
    method: 'get',
    url: '/mock/orde',
    params: {
      offset,
      date,
      limit: 50,
    },
  });
};
