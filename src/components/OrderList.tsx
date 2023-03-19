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
  Center,
  IconButton,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RepeatIcon } from '@chakra-ui/icons';
import useQueryString from '@/lib/hooks/useQueryString';
import orderListApi from '@/api/orderList';
import SortButton from './common/SortButton';
import Loader from './common/Loader';
import Pagination from './common/Pagination';
import OrderListFilter from './OrderListFilter';

const OrderList = () => {
  const clientQuery = useQueryClient();
  const [page, setPage] = useState(1);
  const { getParams, setParams } = useQueryString('filter');
  const { isLoading, data } = useQuery<IOrderData[]>(
    ['orderList'],
    orderListApi.getData,
    {
      refetchInterval: 5000,
      select: (orderList) => {
        return orderList.filter((order) =>
          order.transaction_time.includes(getParams()),
        );
      },
    },
  );

  const paginatedData = useMemo(() => {
    if (!data) return [];

    return data.slice((page - 1) * 50, (page - 1) * 50 + 50);
  }, [data, page]);

  const refetchOrderList = () => {
    clientQuery.invalidateQueries({ queryKey: ['orderList'] });
  };

  useEffect(() => {
    // 요구 사항  2023-03-08 데이터를 보여줄 것
    setParams('2023-03-08');
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HStack w="100%" justifyContent="space-around">
            <HStack>
              <Text>다시 불러오기</Text>
              <IconButton
                aria-label="refetch button"
                icon={<RepeatIcon />}
                onClick={refetchOrderList}
              />
            </HStack>
            <OrderListFilter />
          </HStack>
          <TableContainer w="100%">
            <Table variant="simple">
              <TableCaption>주문 목록 테이블</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <SortButton>주문 번호</SortButton>
                  </Th>
                  <Th>
                    <SortButton>거래일 & 거래시간</SortButton>
                  </Th>
                  <Th>
                    <SortButton>주문 상태</SortButton>
                  </Th>
                  <Th>
                    <SortButton>주문자</SortButton>
                  </Th>
                  <Th>
                    <SortButton>금액</SortButton>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedData.map((item: IOrderData) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.transaction_time}</Td>
                    <Td>{item.status ? '주문 완료' : '처리중'}</Td>
                    <Td>{item.customer_name}</Td>
                    <Td>{item.currency}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan={5}>
                    <Center>
                      <Pagination
                        total={data ? data.length : 0}
                        limit={50}
                        page={page}
                        setPage={setPage}
                      />
                    </Center>
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
export default OrderList;
