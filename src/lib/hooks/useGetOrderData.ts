import { useQuery } from '@tanstack/react-query';
import { getOrderData } from '@/api/order';

const useGetOrderData = (
  pageNum = 1,
  date: string | null,
  sortBy?: string,
  reverse = false,
) => {
  return useQuery({
    queryKey: ['/mock/order', pageNum, date, sortBy, reverse],
    queryFn: () =>
      getOrderData(pageNum - 1, date, sortBy, reverse).then((res) => res.data),
    refetchInterval: 5000,
  });
};

export default useGetOrderData;
