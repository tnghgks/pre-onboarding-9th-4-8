import { Outlet } from 'react-router-dom';
import { Center, VStack, Container, Box } from '@chakra-ui/react';

const Layout = () => {
  return (
    <Container maxW="80%" centerContent padding="4em 0">
      <VStack gap={2} width="100%">
        <Outlet />
      </VStack>
    </Container>
  );
};

export default Layout;
