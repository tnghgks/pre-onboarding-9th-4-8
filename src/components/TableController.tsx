import { Button, ButtonGroup } from '@chakra-ui/react';
import useSetParams from '@/lib/hooks/useSetParams';
import { TODAY } from '@/constants/config';

const TableController = () => {
  const { onSetParams } = useSetParams();

  return (
    <ButtonGroup variant="outline" spacing="4">
      <Button
        colorScheme="blue"
        size="sm"
        onClick={() => onSetParams({ pageValue: 1, dateValue: '' })}
      >
        전체 주문보기
      </Button>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={() => onSetParams({ pageValue: 1, dateValue: TODAY })}
      >
        오늘의 주문보기
      </Button>
    </ButtonGroup>
  );
};

export default TableController;
