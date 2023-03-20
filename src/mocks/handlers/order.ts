import { rest } from 'msw';
import { formatDollarToNumber } from '@/lib/utils/formattingHelper';
import { generateStartAndEndDate } from '@/lib/utils/generator';
import mockData from '../storage/mock_data.json';

export const orderListHandlers = rest.get('/mock/order', (req, res, ctx) => {
  const offset = Number(req.url.searchParams.get('offset'));
  const limit = Number(req.url.searchParams.get('limit'));
  const date = req.url.searchParams.get('date');

  const dataOfSelectedDate = date
    ? mockData.filter((item) => item.transaction_time.split(' ')[0] === date)
    : mockData;

  const { startDate, endDate } = generateStartAndEndDate(dataOfSelectedDate);

  return res(
    ctx.json({
      order: [...dataOfSelectedDate].splice(offset * limit, limit),
      orderInfo: {
        totalCount: dataOfSelectedDate.length,
        totalCurrency: dataOfSelectedDate.reduce(
          (acc, cur) => acc + formatDollarToNumber(cur.currency),
          0,
        ),
        startDate,
        endDate,
      },
    }),
  );
});
