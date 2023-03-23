import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import queryClient from '@/lib/queryClient';
import AdminPage from '@/pages/AdminPage';

describe('<Admin Page />', () => {
  const componentRender = (queryString?: string) => {
    const utils = render(
      <MemoryRouter initialEntries={[`/admin/order?${queryString}`]}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/admin/order" element={<AdminPage />} />
            </Routes>
          </QueryClientProvider>
        </ChakraProvider>
      </MemoryRouter>,
    );

    return utils;
  };

  it('<StatsArea /> 렌더링 테스트', async () => {
    const utils = componentRender('sort=time-descending');

    await screen.findByText('Overview');
    await screen.findByText('Total Order');
    await screen.findByText('Total Currency');
    await screen.findByText('Complete');
    await screen.findByText('Incomplete');

    expect(utils.container).toMatchSnapshot();
  });

  it('<OrderTableArea /> 렌더링 테스트', async () => {
    const utils = componentRender();

    await screen.findByText('Order Table');
    await screen.findByText('Status');
    await screen.findByText('Order ID');
    await screen.findByText('Time');
    await screen.findByText('Currency');

    expect(utils.container).toMatchSnapshot();
  });
});
