import { useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Icon,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { getOrderData } from '@/api/order';
import { useGetOrderData } from '@/queries/orderQuery';

const OrderListPage = () => {
  const { data, isLoading, isError } = useGetOrderData(0, '2023-03-08');

  console.log(data);

  return (
    <>
      <Input
        placeholder="Select Date and Time"
        size="md"
        type="date"
        bg={'white'}
      />
      <TableContainer bg="white" w={'100%'} borderRadius="2xl">
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Customer Name</Th>
              <Th>Customer ID</Th>
              <Th>Status</Th>
              <Th>Time</Th>
              <Th>Currency</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.order.map((orderItem: any) => {
              return (
                <Tr key={orderItem.id}>
                  <Td>{orderItem.id}</Td>
                  <Td>{orderItem.customer_name}</Td>
                  <Td>{orderItem.customer_id}</Td>
                  <Td>
                    {orderItem.status ? (
                      <Icon as={CheckIcon} w={5} h={5} color="green.500" />
                    ) : (
                      <Icon as={WarningIcon} w={5} h={5} color="red.500" />
                    )}
                  </Td>
                  <Td>{orderItem.transaction_time}</Td>
                  <Td>{orderItem.currency}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderListPage;
