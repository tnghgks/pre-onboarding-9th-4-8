import { IOrderItem } from '@/interface/main';

export const searchToCustomer = (
  data: IOrderItem[],
  term: string,
): IOrderItem[] => data.filter((item) => item.customer_name.includes(term));
