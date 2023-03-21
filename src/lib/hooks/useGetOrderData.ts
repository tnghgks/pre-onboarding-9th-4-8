import { useQuery } from '@tanstack/react-query';
import { getOrderData } from '@/api/order';

const useGetOrderData = (
  pageNum = 1,
  date: string | null,
  sortBy?: string,
  reverse = false,
  search?: string,
  status?: string,
) => {
  return useQuery({
    queryKey: ['/mock/order', pageNum, date, sortBy, reverse, search, status],
    queryFn: () =>
      getOrderData(pageNum - 1, date, sortBy, reverse, search, status).then(
        (res) => res.data,
      ),
    refetchInterval: 5000,
  });
};

export default useGetOrderData;
