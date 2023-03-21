import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  ListItem,
  UnorderedList,
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
import { Link } from 'react-router-dom';
import useSetParams from '@/lib/hooks/useSetParams';
import { TODAY } from '@/constants/config';
import useGetOrderData from '@/lib/hooks/useGetOrderData';
import useInput from '@/lib/hooks/useInput';
import { IOrderItem } from '@/interface/main';
import DatePicker from './DatePicker';

const TableController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { currentPage, currentDate, onSetParams } = useSetParams();
  const { data } = useGetOrderData(currentPage, currentDate);

  const [searchName, onChangeSearchName] = useInput('');

  const filterdCustomers = data.order.filter((item: IOrderItem) =>
    item.customer_name
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(searchName.replace(' ', '').toLocaleLowerCase()),
  );

  console.log(filterdCustomers);

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
                placeholder="Select Date and Time"
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

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>고객 이름으로 검색하기</DrawerHeader>

          <DrawerBody>
            <Input
              type="text"
              placeholder="Customer name"
              value={searchName}
              onChange={onChangeSearchName}
            />

            <UnorderedList>
              {filterdCustomers.map((customer: IOrderItem) => (
                <ListItem key={customer.id}>
                  <Link to={`/admin/order?customer=${customer.customer_name}`}>
                    {customer.customer_name}
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="gray">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TableController;
