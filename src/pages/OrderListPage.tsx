import { useSearchParams } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
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
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Spacer,
  Flex,
  Heading,
  Center,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { IoIosPeople } from 'react-icons/io';
import { TfiMoney } from 'react-icons/tfi';
import { useGetOrderData } from '@/queries/orderQuery';
import LoadingFallback from '@/components/LoadingFallback';

const OrderListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE = Number(searchParams.get('page') || 1);
  const DATE = searchParams.get('date');

  const { data, isLoading } = useGetOrderData(PAGE, DATE);

  const onChangePage = (pageNum: number) => {
    searchParams.set('page', String(pageNum + 1));
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const onClickTodayOrder = () => {
    searchParams.set('page', '1');
    searchParams.set('date', '2023-03-08');
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const onClickTotalOrder = () => {
    searchParams.set('page', '1');
    searchParams.set('date', '');
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('page', '1');
    searchParams.set('date', event.target.value);
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  if (isLoading) return <LoadingFallback />;

  const stats = [
    {
      label: 'Total Order',
      stat: data.orderInfo.totalCount,
      icon: IoIosPeople,
      iconColor: 'blue.900',
      helpText: `${data.orderInfo.startDate} - ${data.orderInfo.endDate}`,
    },
    {
      label: 'Total Currency',
      stat: `$ ${data.orderInfo.totalCurrency.toLocaleString('en')}`,
      icon: TfiMoney,
      iconColor: 'blue.900',
      helpText: `${data.orderInfo.startDate} - ${data.orderInfo.endDate}`,
    },
    {
      label: 'Complete',
      stat: data.order.filter((item: any) => item.status).length,
      icon: CheckIcon,
      iconColor: 'green.500',
      helpText: 'per Page',
    },
    {
      label: 'Incomplete',
      stat: data.order.filter((item: any) => !item.status).length,
      icon: WarningIcon,
      iconColor: 'orange.500',
      helpText: 'per Page',
    },
  ];

  return (
    <Flex gap={5} flexDirection="column" w="100%">
      <StatGroup>
        {stats.map((stat) => (
          <Box bg="white" borderRadius="2xl" p="1em 1.5em" key={stat.label}>
            <Flex alignItems="ceter" justifyContent="center" gap={4}>
              <Center>
                <Icon
                  as={stat.icon}
                  w={8}
                  h={8}
                  color={stat.iconColor}
                  alignContent="center"
                />
              </Center>
              <Stat>
                <StatLabel>{stat.label}</StatLabel>
                <StatNumber>{stat.stat}</StatNumber>
                <StatHelpText>{stat?.helpText}</StatHelpText>
              </Stat>
            </Flex>
          </Box>
        ))}
      </StatGroup>
      {DATE && (
        <Input
          placeholder="Select Date and Time"
          size="lg"
          bg="white"
          type="date"
          border="hidden"
          value={DATE}
          onChange={onChangeDate}
        />
      )}
      <Box bg="white" w="100%" borderRadius="2xl" p="1em 2em">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="md">주문 테이블</Heading>
          </Box>
          <Spacer />
          <ButtonGroup variant="outline" spacing="4">
            <Button colorScheme="blue" size="sm" onClick={onClickTotalOrder}>
              전체 주문보기
            </Button>
            <Button colorScheme="blue" size="sm" onClick={onClickTodayOrder}>
              오늘의 주문보기
            </Button>
          </ButtonGroup>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              Showing {PAGE * 50 - 49} - {PAGE * 50 - 50 + data.order.length}{' '}
              out of {data.orderInfo.totalCount}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Status</Th>
                <Th>Customer Name / ID</Th>
                <Th>Time</Th>
                <Th>Currency</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.order.map((orderItem: any) => {
                return (
                  <Tr key={orderItem.id}>
                    <Td>{orderItem.id}</Td>
                    <Td>
                      {orderItem.status ? (
                        <Icon as={CheckIcon} w={5} h={5} color="green.500" />
                      ) : (
                        <Icon as={WarningIcon} w={5} h={5} color="orange.500" />
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
        <Stack spacing={2} direction="row" align="center">
          {Array.from(
            Array(Math.ceil(data.orderInfo.totalCount / 50)).keys(),
          ).map((num) => {
            return (
              <Button
                colorScheme="blue"
                size="sm"
                key={num}
                onClick={() => onChangePage(num)}
                variant={PAGE === num + 1 ? 'solid' : 'outline'}
              >
                {num + 1}
              </Button>
            );
          })}
        </Stack>
      </Box>
    </Flex>
  );
};

export default OrderListPage;
