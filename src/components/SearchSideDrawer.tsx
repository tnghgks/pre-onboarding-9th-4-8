import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  ListItem,
  UnorderedList,
  Highlight,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useQueryString from '@/lib/hooks/useQueryString';
import useOrderQuery from '@/lib/hooks/useOrderQuery';
import useInput from '@/lib/hooks/useInput';

export interface ISearchSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const SearchSideDrawer = ({
  isOpen,
  onClose,
  btnRef,
}: ISearchSideDrawerProps) => {
  const navigate = useNavigate();
  const { currentPage, currentDate, currentCustomer } = useQueryString();
  const [_, customersResult] = useOrderQuery(
    currentPage,
    currentDate,
    currentCustomer,
  );

  const [searchName, onChangeSearchName] = useInput('');

  const filterdCustomers = customersResult.data.filter((customer: string) =>
    customer
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(searchName.replace(' ', '').toLocaleLowerCase()),
  );

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      useInert={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>고객 이름으로 검색하기</DrawerHeader>

        <DrawerBody>
          <Input
            type="text"
            aria-hidden={true}
            placeholder="Customer name"
            value={searchName}
            onChange={onChangeSearchName}
          />

          <UnorderedList>
            {filterdCustomers.map((customer: string) => (
              <ListItem
                key={customer}
                aria-hidden={true}
                cursor="pointer"
                p="0.2em 0"
                onClick={() => navigate(`/admin/order?customer=${customer}`)}
              >
                <Highlight
                  query={searchName}
                  styles={{
                    bg: 'blue.50',
                  }}
                >
                  {customer}
                </Highlight>
              </ListItem>
            ))}
          </UnorderedList>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchSideDrawer;
