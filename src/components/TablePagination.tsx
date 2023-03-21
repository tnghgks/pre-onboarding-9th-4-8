import { Button, Stack } from '@chakra-ui/react';
import useQueryString from '@/lib/hooks/useQueryString';
import { ITEMS_PER_PAGE } from '@/constants/units';
import { generateZeroToNArr } from '@/lib/utils/generator';
import useOrderQuery from '@/lib/hooks/useOrderQuery';

const TablePagination = () => {
  const { currentPage, currentDate, currentCustomer, onSetParams } =
    useQueryString();
  const [orderResult] = useOrderQuery(
    currentPage,
    currentDate,
    currentCustomer,
  );

  return (
    <Stack spacing={2} direction="row" align="center">
      {generateZeroToNArr(
        Math.ceil(orderResult.data.orderInfo.totalCount / ITEMS_PER_PAGE),
      ).map((num) => (
        <Button
          type="button"
          colorScheme="gray"
          size="sm"
          key={num}
          onClick={() => onSetParams({ pageValue: num + 1 })}
          variant={currentPage === num + 1 ? 'solid' : 'outline'}
        >
          {num + 1}
        </Button>
      ))}
    </Stack>
  );
};

export default TablePagination;
