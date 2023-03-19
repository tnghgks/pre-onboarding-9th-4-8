import { VStack, Heading } from '@chakra-ui/react';
import OrderList from '@/components/OrderList';

const OrderListPage = () => {
  return (
    <VStack as="main" w="100%">
      <Heading as="h1">주문목록 페이지</Heading>
      <OrderList OrderData={[]} />
    </VStack>
  );
};
export default OrderListPage;
