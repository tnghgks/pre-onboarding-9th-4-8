import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

const Layout = () => {
  return (
    <Container maxW="80%" centerContent padding="3em 0">
      <Outlet />
    </Container>
  );
};

export default Layout;
