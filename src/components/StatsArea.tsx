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
import { CheckIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { IoIosPeople } from 'react-icons/io';
import { TfiMoney } from 'react-icons/tfi';
import { formatNumToDollar } from '@/lib/utils/formattingHelper';
import { IOrderItem } from '@/interface/main';
import useGetOrderData from '@/lib/hooks/useGetOrderData';
import useSetParams from '@/lib/hooks/useSetParams';

const StatsArea = () => {
  const {
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
    currentSearch,
  } = useSetParams();
  const { data } = useGetOrderData(
    currentPage,
    currentDate,
    currentSortBy,
    currentReverse,
    currentSearch,
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
      stat: data.orderInfo.complete,
      icon: CheckIcon,
      iconColor: 'green.500',
      helpText: 'per Data',
    },
    {
      label: 'Incomplete',
      stat: data.orderInfo.incomplete,
      icon: WarningIcon,
      iconColor: 'orange.500',
      helpText: 'per Data',
    },
  ];
  return (
    <StatGroup>
      {data.order.length !== 0 ? (
        stats.map((stat) => (
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
        ))
      ) : (
        <Box bg="white" borderRadius="2xl" p="1em 1.5em">
          <Flex alignItems="center" justifyContent="center" gap={4}>
            <Center>
              <Icon
                as={CloseIcon}
                w={8}
                h={8}
                color={'red.500'}
                alignContent="center"
              />
            </Center>
            <Stat>
              <StatLabel>검색결과가 없습니다.</StatLabel>
            </Stat>
          </Flex>
        </Box>
      )}
    </StatGroup>
  );
};

export default StatsArea;
