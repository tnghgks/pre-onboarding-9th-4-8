interface IOrderListProps {
  OrderData: string[];
}

interface ISortButtonProps {
  onClick?: () => void;
}

interface IPagination {
  total: number;
  limit: number;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}
