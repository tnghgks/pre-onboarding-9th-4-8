import { Suspense } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import OrderList from '@/components/OrderList';
import Loader from '@/components/common/Loader';

const OrderListPage = () => {
  return (
    <VStack as="main" w="100%">
      <Heading as="h1">주문목록 페이지</Heading>
      <Suspense fallback={<Loader />}>
        <OrderList />
      </Suspense>
    </VStack>
  );
};
export default OrderListPage;
