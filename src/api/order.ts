import { ITEMS_PER_PAGE } from '@/constants/units';
import { ICustomer, IOrderResult } from '@/interface/main';
import apiClient from './apiClient';

export const getOrderData = async (
  offset: number,
  date: string | null,
  customer: string | null,
  filter: string | null,
  sort: string | null,
) => {
  return await apiClient<IOrderResult>({
    method: 'get',
    url: '/mock/order',
    params: {
      offset,
      date,
      customer,
      filter,
      sort,
      limit: ITEMS_PER_PAGE,
    },
  });
};

export const getCustomers = async () => {
  return await apiClient<ICustomer>({
    method: 'get',
    url: '/mock/customers',
  });
};
