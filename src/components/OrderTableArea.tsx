import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Icon,
  Box,
  Spacer,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { IOrderItem } from '@/interface/main';
import useSetParams from '@/lib/hooks/useSetParams';
import { formatPageInfo } from '@/lib/utils/formattingHelper';
import { orderHeader } from '@/constants/orderTable';
import useGetOrderData from '@/lib/hooks/useGetOrderData';
import TablePagination from './TablePagination';
import TableController from './TableController';

const OrderTableArea = () => {
  const {
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
    onSetParams,
  } = useSetParams();
  const { data } = useGetOrderData(
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
  );

  const onClickSortBtn = (e: React.MouseEvent) => {
    const { textContent } = e.target as HTMLButtonElement;

    orderHeader.forEach((header) => {
      if (header.title !== textContent) return;
      if (currentSortBy === header.key) {
        onSetParams({ sortValue: header.key, reverseValue: !currentReverse });
      } else {
        onSetParams({ sortValue: header.key, reverseValue: false });
      }
    });
  };

  return (
    <Box bg="white" w="100%" borderRadius="2xl" p="1em 2em">
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">주문 테이블</Heading>
        </Box>
        <Spacer />
        <TableController />
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            {formatPageInfo(
              currentPage,
              data.order.length,
              data.orderInfo.totalCount,
            )}
          </TableCaption>
          <Thead>
            <Tr>
              {orderHeader.map((header, index) => (
                <Th key={index}>
                  <Button onClick={onClickSortBtn}>{header.title}</Button>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.order.map((orderItem: IOrderItem) => {
              return (
                <Tr key={orderItem.id}>
                  <Td>{orderItem.id}</Td>
                  <Td>
                    {orderItem.status ? (
                      <Flex gap={1}>
                        <Icon as={CheckIcon} w={5} h={5} color="green.500" />
                        Complete
                      </Flex>
                    ) : (
                      <Flex gap={1}>
                        <Icon as={WarningIcon} w={5} h={5} color="orange.500" />
                        Incomplete
                      </Flex>
                    )}
                  </Td>
                  <Td>
                    {orderItem.customer_name} / {orderItem.customer_id}
                  </Td>
                  <Td>{orderItem.transaction_time}</Td>
                  <Td>{orderItem.currency}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <TablePagination />
    </Box>
  );
};

export default OrderTableArea;
