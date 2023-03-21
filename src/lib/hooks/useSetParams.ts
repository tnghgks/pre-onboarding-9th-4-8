import { useSearchParams } from 'react-router-dom';
import { IOnSetParams } from '@/interface/main';

const useSetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentDate = searchParams.get('date');
  const currentSortBy = searchParams.get('sortBy') || 'id';
  const currentReverse = searchParams.get('reverse') === 'true' ? true : false;

  const onSetParams = ({
    pageValue,
    dateValue,
    sortValue,
    reverseValue,
    event,
  }: IOnSetParams) => {
    if (pageValue !== undefined) searchParams.set('page', String(pageValue));
    if (dateValue !== undefined) searchParams.set('date', String(dateValue));
    if (sortValue !== undefined) searchParams.set('sortBy', String(sortValue));
    if (reverseValue !== undefined)
      searchParams.set('reverse', String(reverseValue));
    if (event) searchParams.set('date', String(event.target.value));

    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return {
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
    onSetParams,
  };
};

export default useSetParams;
