import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Button,
} from '@chakra-ui/react';

import TodayFilter from './Filter/TodayFilter';

const OrderListFilter = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>필터</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>필터</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <TodayFilter />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
export default OrderListFilter;
