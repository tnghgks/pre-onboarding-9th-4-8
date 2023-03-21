import { Button, Center, Heading, Stack, ButtonGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IErrorFallbackProps } from '@/interface/main';

const ErrorFallback = ({ resetErrorBoundary }: IErrorFallbackProps) => {
  const navigate = useNavigate();

  const onRefresh = () => {
    navigate('/admin/order');
    window.location.reload();
  };

  return (
    <Center gap={5}>
      <Stack>
        <Heading>There was an error!</Heading>
        <Center>
          <ButtonGroup spacing="2">
            <Button
              type="button"
              variant="outline"
              colorScheme="yellow"
              onClick={resetErrorBoundary}
            >
              Try again
            </Button>
            <Button
              type="button"
              variant="solid"
              colorScheme="yellow"
              onClick={onRefresh}
            >
              새로고침
            </Button>
          </ButtonGroup>
        </Center>
      </Stack>
    </Center>
  );
};

export default ErrorFallback;
