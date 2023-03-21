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
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react';
import { Search2Icon, RepeatIcon } from '@chakra-ui/icons';
import { FiFilter } from 'react-icons/fi';
import { useRef } from 'react';
import useQueryString from '@/lib/hooks/useQueryString';
import { TODAY } from '@/constants/config';
import SearchSideDrawer from './SearchSideDrawer';

const TableController = () => {
  const { getParams, setParams, deleteAllParams, deleteParams } =
    useQueryString();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Stack gap={1}>
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
            <Switch
              id="today-order"
              onChange={(e) =>
                e.target.checked
                  ? setParams('date', TODAY)
                  : deleteParams('date')
              }
              isChecked={!!getParams('date')}
            />
          </FormControl>
          <Flex alignItems="flex-end" justifyContent="flex-end">
            {getParams('date') && (
              <Input
                placeholder="Select Date"
                size="md"
                bg="white"
                type="date"
                w="min"
                value={getParams('date')}
                onChange={(event) => setParams('date', event.target.value)}
              />
            )}
          </Flex>
        </Stack>
        <Spacer />

        <ButtonGroup>
          <Menu>
            <Tooltip label="Filter by status">
              <MenuButton
                as={IconButton}
                size="lg"
                aria-label="Options"
                icon={<FiFilter />}
              />
            </Tooltip>

            <MenuList>
              <MenuItem onClick={() => setParams('filter', 'complete')}>
                Only Complete
              </MenuItem>
              <MenuItem onClick={() => setParams('filter', 'incomplete')}>
                Only Incomplete
              </MenuItem>
            </MenuList>
          </Menu>
          <Tooltip label="Search customer">
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              size="lg"
              aria-label="Search customer-name"
              icon={<Search2Icon />}
            />
          </Tooltip>
          <Tooltip label="Initialize query">
            <IconButton
              onClick={deleteAllParams}
              size="lg"
              aria-label="Initialize params"
              icon={<RepeatIcon />}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>

      <SearchSideDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default TableController;
