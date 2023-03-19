import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useState } from 'react';
import useQueryString from '@/lib/hooks/useQueryString';

const TodayFilter = () => {
  const { getParams, setParams } = useQueryString('filter');
  const [toggle, setToggle] = useState(getParams() ? true : false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggle((prev) => !prev);
    return e.target.checked ? setParams('2023-03-08') : setParams('');
  };

  return (
    <FormControl display="flex" alignItems="center">
      <Switch id="today-order-list" onChange={onChange} isChecked={toggle} />
      <FormLabel htmlFor="today-order-list" mb="0">
        금일 주문 목록
      </FormLabel>
    </FormControl>
  );
};
export default TodayFilter;
