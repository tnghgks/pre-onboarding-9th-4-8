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
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { IoIosPeople } from 'react-icons/io';
import { TfiMoney } from 'react-icons/tfi';
import { formatNumToDollar } from '@/lib/utils/formattingHelper';
import { IOrderItem } from '@/interface/main';
import useGetOrderData from '@/lib/hooks/useGetOrderData';
import useSetParams from '@/lib/hooks/useSetParams';

const StatsArea = () => {
  const { currentPage, currentDate, currentSortBy, currentReverse } =
    useSetParams();
  const { data } = useGetOrderData(
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
  );

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
      stat: formatNumToDollar(data.orderInfo.totalCurrency),
      icon: TfiMoney,
      iconColor: 'blue.900',
      helpText: `${data.orderInfo.startDate} - ${data.orderInfo.endDate}`,
    },
    {
      label: 'Complete',
      stat: data.order.filter((item: IOrderItem) => item.status).length,
      icon: CheckIcon,
      iconColor: 'green.500',
      helpText: 'per Page',
    },
    {
      label: 'Incomplete',
      stat: data.order.filter((item: IOrderItem) => !item.status).length,
      icon: WarningIcon,
      iconColor: 'orange.500',
      helpText: 'per Page',
    },
  ];
  return (
    <StatGroup>
      {stats.map((stat) => (
        <Box bg="white" borderRadius="2xl" p="1em 1.5em" key={stat.label}>
          <Flex alignItems="center" justifyContent="center" gap={4}>
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
  );
};

export default StatsArea;
