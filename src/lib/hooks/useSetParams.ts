import { useSearchParams } from 'react-router-dom';
import { IOnSetParams } from '@/interface/props';

const useSetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE = Number(searchParams.get('page')) || 1;
  const DATE = searchParams.get('date');

  const onSetParams = ({ pageValue, dateValue, event }: IOnSetParams) => {
    if (pageValue !== undefined) searchParams.set('page', String(pageValue));
    if (dateValue !== undefined) searchParams.set('date', String(dateValue));
    if (event) searchParams.set('date', String(event.target.value));

    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return { PAGE, DATE, onSetParams };
};

export default useSetParams;
