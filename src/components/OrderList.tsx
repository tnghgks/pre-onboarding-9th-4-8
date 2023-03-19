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
} from '@chakra-ui/react';
import SortButton from './common/SortButton';

const OrderList = ({ OrderData }: IOrderListProps) => {
  const changeToSort = () => {
    return;
  };

  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <TableCaption>주문 목록 테이블</TableCaption>
        <Thead>
          <Tr>
            <Th>
              <SortButton onClick={changeToSort}>주문 번호</SortButton>
            </Th>
            <Th>
              <SortButton onClick={changeToSort}>주문 시간</SortButton>
            </Th>
            <Th>
              <SortButton onClick={changeToSort}>거래일 & 거래시간</SortButton>
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
          {OrderData.map((body: string) => (
            <Tr key={body}>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>주문 번호</Th>
            <Th>주문 시간</Th>
            <Th>거래일 & 거래시간</Th>
            <Th>주문 상태</Th>
            <Th>주문자</Th>
            <Th>금액</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
export default OrderList;
