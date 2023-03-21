export interface IOrderItem {
  currency: string;
  customer_id: number;
  customer_name: string;
  id: number;
  status: boolean;
  transaction_time: string;
}

export interface IOrderInfo {
  endDate: string;
  startDate: string;
  totalCount: number;
  totalCurrency: number;
}

export interface IOnSetParams {
  pageValue?: number;
  dateValue?: string;
  sortValue?: string;
  searchValue?: string;
  reverseValue?: boolean;
  statusValue?: string;
  event?: React.ChangeEvent<HTMLInputElement>;
}

export interface IErrorFallbackProps {
  resetErrorBoundary: (...args: unknown[]) => void;
}
export interface ISort<T> {
  array: T[];
  sortBy: keyof T | string;
  reverse: boolean;
}
