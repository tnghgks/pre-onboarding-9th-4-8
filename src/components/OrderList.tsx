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
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RepeatIcon } from '@chakra-ui/icons';
import orderListApi from '@/api/orderList';
import SortButton from './common/SortButton';
import Loader from './common/Loader';
import Pagination from './common/Pagination';

const OrderList = () => {
  const clientQuery = useQueryClient();
  const [filteredData, setFilteredData] = useState<IOrderData[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery<IOrderData[]>(
    ['orderList'],
    orderListApi.getData,
  );

  const changeToSort = () => {
    return;
  };

  useEffect(() => {
    if (data) {
      const filtered = data.slice((page - 1) * 50, (page - 1) * 50 + 50);
      setFilteredData(filtered);
    }
  }, [data, page]);

  const refetch = () => {
    clientQuery.invalidateQueries({ queryKey: ['orderList'] });
  };

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
                onClick={refetch}
              />
            </HStack>
          </HStack>
          <TableContainer w="100%">
            <Table variant="simple">
              <TableCaption>주문 목록 테이블</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <SortButton onClick={changeToSort}>주문 번호</SortButton>
                  </Th>
                  <Th>
                    <SortButton onClick={changeToSort}>
                      거래일 & 거래시간
                    </SortButton>
                  </Th>
                  <Th>
                    <SortButton onClick={changeToSort}>주문 상태</SortButton>
                  </Th>
                  <Th>
                    <SortButton onClick={changeToSort}>주문자</SortButton>
                  </Th>
                  <Th>
                    <SortButton onClick={changeToSort}>금액</SortButton>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((item: IOrderData) => (
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
