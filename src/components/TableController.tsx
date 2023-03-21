import { Button, ButtonGroup, FormControl, Input } from '@chakra-ui/react';
import useSetParams from '@/lib/hooks/useSetParams';
import { TODAY } from '@/constants/config';
import Filter from './OrderFilter';

const TableController = () => {
  const { onSetParams } = useSetParams();

  const onSearch = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { search } = e.target as EventTarget & { search: HTMLInputElement };
    onSetParams({ searchValue: search.value });
    search.value = '';
  };

  return (
    <>
      <ButtonGroup variant="outline" spacing="4">
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => onSetParams({ pageValue: 1, dateValue: '' })}
        >
          전체 주문보기
        </Button>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => onSetParams({ pageValue: 1, dateValue: TODAY })}
        >
          오늘의 주문보기
        </Button>
        <Filter />
      </ButtonGroup>
      <FormControl
        display="flex"
        justifyContent="flex-end"
        w="auto"
        gap="3"
        alignItems="center"
        as="form"
        onSubmit={onSearch}
        overflow="hidden"
      >
        <Input name="search" type="text" w="auto" placeholder="주문자 검색" />
        <Button type="submit">검색</Button>
      </FormControl>
    </>
  );
};

export default TableController;
