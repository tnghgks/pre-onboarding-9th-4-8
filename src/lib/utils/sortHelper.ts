import { ISort } from '@/interface/main';

const sortTypeString = <T>({ array, sortBy, reverse = false }: ISort<T>) =>
  [...array].sort((a: any, b: any) =>
    reverse
      ? b[sortBy].localeCompare(a[sortBy])
      : a[sortBy].localeCompare(b[sortBy]),
  );

const sortTypeDate = <T>({ array, sortBy, reverse = false }: ISort<T>) =>
  [...array].sort((a: any, b: any) =>
    reverse
      ? new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()
      : new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime(),
  );

const sortTypeNumber = <T>({ array, sortBy, reverse = false }: ISort<T>) =>
  [...array].sort((a: any, b: any) =>
    reverse ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy],
  );

const sortTypeCurrency = <T>({ array, sortBy, reverse = false }: ISort<T>) =>
  [...array].sort((a: any, b: any) =>
    reverse
      ? parseFloat(b[sortBy].replace('$', '')) -
        parseFloat(a[sortBy].replace('$', ''))
      : parseFloat(a[sortBy].replace('$', '')) -
        parseFloat(b[sortBy].replace('$', '')),
  );
export const sort = <T>({
  array,
  sortBy = 'id',
  reverse = false,
}: ISort<T>) => {
  if (sortBy === 'transaction_time') {
    return sortTypeDate<T>({
      array,
      sortBy,
      reverse,
    });
  } else if (sortBy === 'customer_name') {
    return sortTypeString<T>({
      array,
      sortBy,
      reverse,
    });
  } else if (sortBy === 'currency') {
    return sortTypeCurrency<T>({
      array,
      sortBy,
      reverse,
    });
  } else {
    return sortTypeNumber<T>({
      array,
      sortBy,
      reverse,
    });
  }
};
