import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton } from '@chakra-ui/react';

const Pagination = ({ total, limit, page, setPage }: IPagination) => {
  const pageLength = Math.ceil(total / limit);

  return (
    <HStack>
      <IconButton
        aria-label="previous button"
        icon={<ArrowBackIcon />}
        onClick={() => setPage(page - 1)}
        isDisabled={page === 1}
        variant="outline"
        colorScheme="blue"
      />
      {Array(pageLength)
        .fill(0)
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-label={page === i + 1 ? 'current page' : 'page'}
            colorScheme="blue"
            variant={page === i + 1 ? 'solid' : 'outline'}
          >
            {i + 1}
          </Button>
        ))}
      <IconButton
        aria-label="previous button"
        icon={<ArrowForwardIcon />}
        onClick={() => setPage(page + 1)}
        isDisabled={page === pageLength}
        variant="outline"
        colorScheme="blue"
      />
    </HStack>
  );
};
export default Pagination;
