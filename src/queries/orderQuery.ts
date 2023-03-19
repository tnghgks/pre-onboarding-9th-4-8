import { useQuery } from '@tanstack/react-query';
import { getOrderData } from '@/api/order';

export const useGetOrderData = (offset: number, date: string) => {
  return useQuery({
    queryKey: ['/mock/order', offset, date],
    queryFn: () => getOrderData(offset, date).then((res) => res.data),
    // refetchInterval: 5000,
  });
};
