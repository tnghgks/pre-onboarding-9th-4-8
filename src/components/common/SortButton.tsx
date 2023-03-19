import { PropsWithChildren } from 'react';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

const SortButton = ({
  children,
  onClick,
}: PropsWithChildren<ISortButtonProps>) => {
  return (
    <HStack>
      <Text>{children}</Text>
      <IconButton
        aria-label="Change to Sort"
        icon={<ArrowUpDownIcon />}
        onClick={onClick}
      />
    </HStack>
  );
};
export default SortButton;
