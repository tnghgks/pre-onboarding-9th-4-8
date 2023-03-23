import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import AdminPage from '@/pages/AdminPage';
import queryClient from '@/lib/queryClient';

describe('Admin Page Rendering', () => {
  it('페이지 정상 렌더링 테스트', async () => {
    render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<AdminPage />} />
            </Routes>
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>,
    );

    expect(await screen.findByText('Overview')).toBeInTheDocument();
    expect(await screen.findByText('Order Table')).toBeInTheDocument();
  });

  it('검색된 유저 클릭 시 쿼리 스트링 변경', async () => {
    render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback="loading...">
                    <AdminPage />
                  </Suspense>
                }
              />
            </Routes>
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>,
    );

    window.scrollTo = jest.fn();

    const searchBtn = await screen.findByTestId('searchBtn');
    fireEvent.click(searchBtn);

    const searchInput = await screen.findByTestId('searchInput');
    fireEvent.click(searchInput);
    fireEvent.change(searchInput, { target: { value: 'annb' } });

    const searchResult = await screen.findByText('Ann Barron');
    fireEvent.click(searchResult);

    await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

    let url = new URLSearchParams(window.location.search);
    expect(url.get('customer')).toBe('Ann Barron');
  });

  it('주문 상태 필터 변경 시 쿼리 스트링 변경', async () => {
    render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback="loading...">
                    <AdminPage />
                  </Suspense>
                }
              />
            </Routes>
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>,
    );

    const filterBtn = await screen.findByTestId('filterBtn');
    fireEvent.click(filterBtn);

    const completeBtn = await screen.findByText('Only Complete');
    fireEvent.click(completeBtn);

    await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

    let url = new URLSearchParams(window.location.search);
    expect(url.get('filter')).toBe('complete');
  });
});
