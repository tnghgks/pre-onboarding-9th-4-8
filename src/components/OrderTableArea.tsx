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
import useQueryString from '@/lib/hooks/useQueryString';
import { formatPageInfo } from '@/lib/utils/formattingHelper';
import useOrderQuery from '@/lib/hooks/useOrderQuery';
import TablePagination from './TablePagination';
import TableController from './TableController';

const OrderTableArea = () => {
  const { getParams, setParams } = useQueryString();
  const [orderResult] = useOrderQuery(
    getParams('page'),
    getParams('date'),
    getParams('customer'),
    getParams('filter'),
    getParams('sort'),
  );

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
              Number(getParams('page')),
              orderResult.data.order.length,
              orderResult.data.orderInfo.totalCount,
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
                  onClick={() => setParams('sort', 'id-descending')}
                />
              </Th>
              <Th>Customer Name / ID</Th>
              <Th>
                Time&nbsp;&nbsp;
                <IconButton
                  size="xs"
                  aria-label="Search database"
                  icon={<ArrowUpDownIcon />}
                  onClick={() => setParams('sort', 'time-descending')}
                />
              </Th>
              <Th>Currency</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderResult.data.order.map((orderItem: IOrderItem) => {
              return (
                <Tr key={orderItem.id}>
                  <Td>
                    {orderItem.status ? (
                      <Icon as={CheckIcon} w={4} h={4} color="green.500" />
                    ) : (
                      <Icon as={WarningIcon} w={4} h={4} color="orange.500" />
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
