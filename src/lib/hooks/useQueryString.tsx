import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQueryString = (key: string) => {
  const [searchParams, seSearchParams] = useSearchParams();

  const getParams = useCallback((): string => {
    const params = searchParams.get(key) || '';

    return params;
  }, [key, searchParams]);

  const setParams = useCallback(
    (value: string): void => {
      if (value) {
        seSearchParams(`${key}=${value}`);
      } else {
        seSearchParams(``);
      }
    },
    [key, seSearchParams],
  );

  return { getParams, setParams };
};

export default useQueryString;
