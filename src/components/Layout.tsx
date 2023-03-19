import { Outlet } from 'react-router-dom';
import { Center, VStack, Container, Box } from '@chakra-ui/react';

const Layout = () => {
  return (
    <Box bg="blue.50" padding={'30px 0'}>
      <Container maxW="80%" centerContent>
        <nav>navigation</nav>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
