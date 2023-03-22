import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import queryClient from '@/lib/queryClient';
import { worker } from '@/mocks/browser';
import { theme } from '@/lib/styles/theme';
import Router from './Router';
import { IS_MOCK } from './constants/config';

if (IS_MOCK) {
  worker.start();
}

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
