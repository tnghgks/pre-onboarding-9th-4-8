import { useSearchParams } from 'react-router-dom';
import { IOnSetParams } from '@/interface/main';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentDate = searchParams.get('date');
  const currentCustomer = searchParams.get('customer');

  const onSetParams = ({
    pageValue,
    dateValue,
    customerValue,
    event,
  }: IOnSetParams) => {
    if (pageValue !== undefined) searchParams.set('page', String(pageValue));
    if (dateValue !== undefined) searchParams.set('date', String(dateValue));
    if (customerValue !== undefined)
      searchParams.set('customer', String(customerValue));
    if (event) searchParams.set('date', String(event.target.value));

    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return { currentPage, currentDate, currentCustomer, onSetParams };
};

export default useQueryString;
