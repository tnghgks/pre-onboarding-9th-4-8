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
  Heading,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { IOrderItem } from '@/interface/main';
import useSetParams from '@/lib/hooks/useSetParams';
import { formatPageInfo } from '@/lib/utils/formattingHelper';
import useGetOrderData from '@/lib/hooks/useGetOrderData';
import TablePagination from './TablePagination';
import TableController from './TableController';

const OrderTableArea = () => {
  const { currentPage, currentDate } = useSetParams();
  const { data } = useGetOrderData(currentPage, currentDate);

  return (
    <Box bg="white" w="100%" borderRadius="md" boxShadow="lg">
      <Box p="1em 2em">
        <Heading size="md">Order Table</Heading>
      </Box>
      <Box p="1em 2em">
        <TableController />
      </Box>
      <TableContainer p="1em 2em">
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
              <Th>Status</Th>

              <Th>
                Order ID&nbsp;&nbsp;
                <IconButton
                  size="xs"
                  aria-label="Search database"
                  icon={<ArrowUpDownIcon />}
                />
              </Th>
              <Th>Customer Name / ID</Th>
              <Th>
                Time&nbsp;&nbsp;
                <IconButton
                  size="xs"
                  aria-label="Search database"
                  icon={<ArrowUpDownIcon />}
                />
              </Th>
              <Th>Currency</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.order.map((orderItem: IOrderItem) => {
              return (
                <Tr key={orderItem.id}>
                  <Td>
                    {orderItem.status ? (
                      <Icon as={CheckIcon} w={5} h={5} color="green.500" />
                    ) : (
                      <Icon as={WarningIcon} w={5} h={5} color="orange.500" />
                    )}
                  </Td>
                  <Td>{orderItem.id}</Td>
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
      <Center p="1em 2em">
        <TablePagination />
      </Center>
    </Box>
  );
};

export default OrderTableArea;
