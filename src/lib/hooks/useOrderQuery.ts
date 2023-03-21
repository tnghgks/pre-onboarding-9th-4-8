import { useQueries } from '@tanstack/react-query';
import { getCustomers, getOrderData } from '@/api/order';

const useOrderQuery = (pageNum: string, date: string, customer: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ['/mock/order', pageNum, date, customer],
        queryFn: () =>
          getOrderData(Number(pageNum) - 1, date, customer).then(
            (res) => res.data,
          ),
        // refetchInterval: 5000,
      },
      {
        queryKey: ['/mock/customers'],
        queryFn: () => getCustomers().then((res) => res.data.customers),
      },
    ],
  });
};

export default useOrderQuery;
