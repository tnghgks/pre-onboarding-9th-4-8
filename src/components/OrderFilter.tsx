import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Center,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  Select,
  VStack,
} from '@chakra-ui/react';
import useSetParams from '@/lib/hooks/useSetParams';

const Filter = () => {
  const { onSetParams, resetParams } = useSetParams();

  const onFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSetParams({ statusValue: e.target.value });
  };

  return (
    <Popover colorScheme="blue" size="sm">
      <PopoverTrigger>
        <Button>필터</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>필터</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <VStack gap={3}>
              <Select placeholder="주문 상태" onChange={onFilter}>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </Select>
              <Center>
                <Button colorScheme="blue" size="sm" onClick={resetParams}>
                  필터 삭제
                </Button>
              </Center>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
export default Filter;
