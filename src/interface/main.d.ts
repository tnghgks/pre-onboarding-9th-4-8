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
  customerValue?: string;
  event?: React.ChangeEvent<HTMLInputElement>;
}

export interface IErrorFallbackProps {
  resetErrorBoundary: (...args: unknown[]) => void;
}
