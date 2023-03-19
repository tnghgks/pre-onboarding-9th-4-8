import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Button,
  ButtonGroup,
  Stack,
  Divider,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { useGetOrderData } from '@/queries/orderQuery';

const OrderListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE = Number(searchParams.get('page') || 1);
  const DATE = searchParams.get('date');

  const { data, isLoading, isError } = useGetOrderData(PAGE, DATE);

  const onChangePage = (pageNum: number) => {
    searchParams.set('page', String(pageNum + 1));
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const onClickTodayOrder = () => {
    searchParams.set('date', '2023-03-08');
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const onClickTotalOrder = () => {
    navigate('/admin/order');
    window.scrollTo(0, 0);
  };

  if (isLoading) return <>Loading..</>;
  return (
    <Grid>
      <GridItem bg="white" w={'100%'} borderRadius="2xl">
        <Button onClick={onClickTotalOrder}>전체 주문보기</Button>
        <Button onClick={onClickTodayOrder}>오늘의 주문보기</Button>
        <TableContainer>
          <Table variant="simple">
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
                        <Icon as={WarningIcon} w={5} h={5} color="orange.500" />
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
      </GridItem>

      <Stack spacing={2} direction="row" align="center">
        {Array.from(Array(Math.ceil(data.orderCount / 50)).keys()).map(
          (num) => {
            return (
              <Button
                colorScheme="teal"
                size="sm"
                key={num}
                onClick={() => onChangePage(num)}
                variant={PAGE === num + 1 ? 'solid' : 'outline'}
              >
                {num + 1}
              </Button>
            );
          },
        )}
      </Stack>
    </Grid>
  );
};

export default OrderListPage;
