import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Flex,
  Center,
  Icon,
  Box,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { IoIosPeople } from 'react-icons/io';
import { TfiMoney } from 'react-icons/tfi';
import { formatNumToDollar } from '@/lib/utils/formattingHelper';
import { IOrderItem } from '@/interface/main';
import useQueryString from '@/lib/hooks/useQueryString';
import useOrderQuery from '@/lib/hooks/useOrderQuery';

const StatsArea = () => {
  const { currentPage, currentDate, currentCustomer } = useQueryString();
  const [orderResult] = useOrderQuery(
    currentPage,
    currentDate,
    currentCustomer,
  );

  const stats = [
    {
      label: 'Total Order',
      stat: orderResult.data.orderInfo.totalCount,
      icon: IoIosPeople,
      iconColor: 'blue.900',
      helpText: `${orderResult.data.orderInfo.startDate} - ${orderResult.data.orderInfo.endDate}`,
    },
    {
      label: 'Total Currency',
      stat: formatNumToDollar(orderResult.data.orderInfo.totalCurrency),
      icon: TfiMoney,
      iconColor: 'blue.900',
      helpText: `${orderResult.data.orderInfo.startDate} - ${orderResult.data.orderInfo.endDate}`,
    },
    {
      label: 'Complete',
      stat: orderResult.data.order.filter((item: IOrderItem) => item.status)
        .length,
      icon: CheckIcon,
      iconColor: 'green.500',
      helpText: 'per Page',
    },
    {
      label: 'Incomplete',
      stat: orderResult.data.order.filter((item: IOrderItem) => !item.status)
        .length,
      icon: WarningIcon,
      iconColor: 'orange.500',
      helpText: 'per Page',
    },
  ];
  return (
    <Box bg="white" w="100%" borderRadius="md" boxShadow="lg">
      <Box p="1em 2em">
        <Heading size="md">Overview</Heading>
      </Box>
      <StatGroup p="1.5em 1em">
        {stats.map((stat) => (
          <Box key={stat.label}>
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
                <StatHelpText>{stat.helpText}</StatHelpText>
              </Stat>
            </Flex>
          </Box>
        ))}
      </StatGroup>
    </Box>
  );
};

export default StatsArea;
