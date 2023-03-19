import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';

const ErrorFallback = ({ error, resetErrorBoundary }: IErrorFallback) => {
  return (
    <Center w="100%" h="100vh">
      <Card align="center">
        <CardHeader>
          <Heading size="md" color="red.400">
            에러가 발생하였습니다.
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>{error.message}</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue" onClick={resetErrorBoundary}>
            새로 고침
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
};
export default ErrorFallback;
