import { rest } from 'msw';
import { formatDollarToNumber } from '@/lib/utils/formattingHelper';
import { generateStartAndEndDate } from '@/lib/utils/generator';
import { sort } from '@/lib/utils/sortHelper';
import { IOrderItem } from '@/interface/main';
import { searchToCustomer } from '@/lib/utils/searchHelper';
import mockData from '../storage/mock_data.json';

export const orderListHandlers = [
  rest.get('/mock/order', (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));
    const date = req.url.searchParams.get('date');
    const sortBy = req.url.searchParams.get('sortBy') || 'id';
    const reverse =
      req.url.searchParams.get('reverse') === 'true' ? true : false;
    const search = req.url.searchParams.get('search');
    const status = req.url.searchParams.get('status');
    console.log(status);

    const dataOfSelectedDate: IOrderItem[] = date
      ? mockData.filter((item) => item.transaction_time.split(' ')[0] === date)
      : mockData;

    const filteredData: IOrderItem[] = status
      ? status === 'complete'
        ? dataOfSelectedDate.filter((item) => item.status)
        : dataOfSelectedDate.filter((item) => !item.status)
      : dataOfSelectedDate;
    console.log(filteredData);
    const searchedData = search
      ? searchToCustomer(filteredData, search)
      : filteredData;

    const { startDate, endDate } = generateStartAndEndDate(searchedData);

    const sortedData = sort({ array: searchedData, sortBy, reverse });

    return res(
      ctx.json({
        order: [...sortedData].splice(offset * limit, limit),
        orderInfo: {
          totalCount: sortedData.length,
          totalCurrency: sortedData.reduce(
            (acc, cur) => acc + formatDollarToNumber(cur.currency),
            0,
          ),
          startDate,
          endDate,
          complete: sortedData.filter((item: IOrderItem) => item.status).length,
          incomplete: sortedData.filter((item: IOrderItem) => !item.status)
            .length,
        },
      }),
    );
  }),
];
