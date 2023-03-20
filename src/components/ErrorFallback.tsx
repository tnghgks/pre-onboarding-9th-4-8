import { Button, Center, Heading } from '@chakra-ui/react';
import { IErrorFallbackProps } from '@/interface/main';

const ErrorFallback = ({ resetErrorBoundary }: IErrorFallbackProps) => {
  return (
    <Center style={{ textAlign: 'center' }} gap={5}>
      <Heading>There was an error!</Heading>
      <Button type="button" colorScheme="blue" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Center>
  );
};

export default ErrorFallback;
