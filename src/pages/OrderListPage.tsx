import { useEffect } from 'react';
import { getOrderData } from '@/api/order';

const OrderListPage = () => {
  useEffect(() => {
    getOrderData();
  }, []);

  return <>OrderListPage</>;
};

export default OrderListPage;
