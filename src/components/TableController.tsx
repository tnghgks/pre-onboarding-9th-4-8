import {
  useDisclosure,
  Input,
  Switch,
  FormControl,
  FormLabel,
  Stack,
  Highlight,
  Flex,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useRef } from 'react';
import useQueryString from '@/lib/hooks/useQueryString';
import { TODAY } from '@/constants/config';
import SearchSideDrawer from './SearchSideDrawer';

const TableController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { currentDate, onSetParams } = useQueryString();

  const onToggleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetParams({ pageValue: 1, dateValue: event.target.checked ? TODAY : '' });
  };

  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          size="lg"
          aria-label="Search customer-name"
          icon={<Search2Icon />}
        />

        <Spacer />
        <Stack gap={1}>
          <FormControl
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <FormLabel htmlFor="completed-order" mb="0">
              <Highlight
                query="completed"
                styles={{
                  px: '2',
                  py: '0.5',
                  rounded: 'full',
                  bg: 'green.100',
                }}
              >
                Do you want to see Completed order?
              </Highlight>
            </FormLabel>
            <Switch id="completed-order" />
          </FormControl>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <FormLabel htmlFor="today-order" mb="0">
              <Highlight
                query="today`s"
                styles={{ px: '2', py: '0.5', rounded: 'full', bg: 'blue.100' }}
              >
                Do you want to see Today`s order?
              </Highlight>
            </FormLabel>
            <Switch id="today-order" onChange={onToggleDate} />
          </FormControl>
          <Flex alignItems="flex-end" justifyContent="flex-end">
            {currentDate && (
              <Input
                placeholder="Select Date"
                size="md"
                bg="white"
                type="date"
                w="min"
                value={currentDate}
                onChange={(event) => onSetParams({ event })}
              />
            )}
          </Flex>
        </Stack>
      </Flex>

      <SearchSideDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default TableController;
