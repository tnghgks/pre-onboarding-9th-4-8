import { lazy, Suspense } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, theme } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import queryClient from '@/lib/queryClient';
import { isElementTD } from '@/lib/utils/testingFn';

const OrderTableArea = lazy(() => import('@/components/OrderTableArea'));

describe('<OrderTableArea />', () => {
  const componentRender = () => {
    const utils = render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback="loading...">
              <OrderTableArea />
            </Suspense>
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>,
    );

    return utils;
  };

  it('<OrderTableArea /> 렌더링 테스트', async () => {
    const utils = componentRender();

    await screen.findByText('Order Table');
    await screen.findByText('Status');
    await screen.findByText('Order ID');
    await screen.findByText('Time');
    await screen.findByText('Currency');
    await screen.findAllByTestId('status');
    await screen.findAllByTestId('id');
    await screen.findAllByTestId('customer_name');
    await screen.findAllByTestId('transaction_time');
    await screen.findAllByTestId('currency');

    expect(utils.container).toMatchSnapshot();
  });

  it('<OrderTableArea /> 기본 정렬은 오름차순', async () => {
    componentRender();

    const idList = (await screen.findAllByTestId('id')).map(
      (item) => item.textContent,
    );

    const ascendingIdList = [...idList].sort((a, b) => Number(a) - Number(b));

    expect(idList).toEqual(ascendingIdList);
  });

  it('<OrderTableArea /> 주문에 대한 모든 정보는 표 형태', async () => {
    componentRender();

    const statusList = await screen.findAllByTestId('status');
    const idList = await screen.findAllByTestId('id');
    const customerNameList = await screen.findAllByTestId('customer_name');
    const TimeList = await screen.findAllByTestId('transaction_time');
    const currencyList = await screen.findAllByTestId('currency');

    expect(isElementTD(statusList)).toBeTruthy();
    expect(isElementTD(idList)).toBeTruthy();
    expect(isElementTD(customerNameList)).toBeTruthy();
    expect(isElementTD(TimeList)).toBeTruthy();
    expect(isElementTD(currencyList)).toBeTruthy();
  });

  it('<OrderTableArea /> 한 페이지에는 50건의 주문', async () => {
    componentRender();

    const idList = await screen.findAllByTestId('id');
    expect(idList.length).toBe(50);
  });

  it('<OrderTableArea /> Order Id 정렬 버튼 테스트', async () => {
    componentRender();

    const sortButton = await screen.findByTestId('sort_by_id');
    window.scrollTo = jest.fn();

    fireEvent.click(sortButton);
    let url = new URLSearchParams(window.location.search);
    expect(url.get('sort')).toBe('id-descending');

    fireEvent.click(sortButton);
    url = new URLSearchParams(window.location.search);
    expect(url.get('sort')).toBe('id-ascending');
  });

  it('<OrderTableArea /> Order Time 정렬 버튼 테스트', async () => {
    componentRender();

    const sortButton = await screen.findByTestId('sort_by_time');
    window.scrollTo = jest.fn();

    fireEvent.click(sortButton);
    let url = new URLSearchParams(window.location.search);
    expect(url.get('sort')).toBe('time-descending');

    fireEvent.click(sortButton);
    url = new URLSearchParams(window.location.search);
    expect(url.get('sort')).toBe('time-ascending');
  });
});
