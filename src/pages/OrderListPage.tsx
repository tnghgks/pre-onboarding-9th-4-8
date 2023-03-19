import { useEffect } from 'react';
import { getOrderData } from '@/api/order';
import { useGetOrderData } from '@/queries/orderQuery';

const OrderListPage = () => {
  const { data, isLoading, isError } = useGetOrderData(0, '2023-03-08');

  console.log(data);

  return <>OrderListPage</>;
};

export default OrderListPage;
