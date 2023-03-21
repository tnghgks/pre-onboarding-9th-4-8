import { ITEMS_PER_PAGE } from '@/constants/units';
import apiClient from './apiClient';

export const getOrderData = async (
  offset: number,
  date: string | null,
  sortBy?: string,
  reverse?: boolean,
  search?: string,
  status?: string,
) => {
  return await apiClient({
    method: 'get',
    url: '/mock/order',
    params: {
      offset,
      date,
      limit: ITEMS_PER_PAGE,
      sortBy,
      reverse,
      search,
      status,
    },
  });
};
