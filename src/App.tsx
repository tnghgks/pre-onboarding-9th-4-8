import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import queryClient from '@/queries/queryClient';
import { worker } from '@/mocks/browser';
import Router from './Router';

worker.start();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
