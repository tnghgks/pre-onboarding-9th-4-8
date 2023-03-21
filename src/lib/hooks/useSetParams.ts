import { useSearchParams } from 'react-router-dom';
import { IOnSetParams } from '@/interface/main';

const useSetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentDate = searchParams.get('date');
  const currentSortBy = searchParams.get('sortBy') || 'id';
  const currentReverse = searchParams.get('reverse') === 'true' ? true : false;
  const currentSearch = searchParams.get('search') || '';

  const onSetParams = ({
    pageValue,
    dateValue,
    sortValue,
    reverseValue,
    searchValue,
    event,
  }: IOnSetParams) => {
    if (pageValue !== undefined) searchParams.set('page', String(pageValue));
    if (dateValue !== undefined) searchParams.set('date', String(dateValue));
    if (sortValue !== undefined) searchParams.set('sortBy', String(sortValue));
    if (searchValue !== undefined)
      searchParams.set('search', String(searchValue));
    if (reverseValue !== undefined)
      searchParams.set('reverse', String(reverseValue));
    if (event) searchParams.set('date', String(event.target.value));

    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const resetParams = () => {
    setSearchParams('');
  };

  return {
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
    currentSearch,
    onSetParams,
    resetParams,
  };
};

export default useSetParams;
