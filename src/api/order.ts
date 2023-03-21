import { ITEMS_PER_PAGE } from '@/constants/units';
import apiClient from './apiClient';

export const getOrderData = async (
  offset: number,
  date: string | null,
  customer: string | null,
) => {
  return await apiClient({
    method: 'get',
    url: '/mock/order',
    params: {
      offset,
      date,
      customer,
      limit: ITEMS_PER_PAGE,
    },
  });
};

export const getCustomers = async () => {
  return await apiClient({
    method: 'get',
    url: '/mock/customers',
  });
};
