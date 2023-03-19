import { rest } from 'msw';
import { formatDollorToNumber } from '@/lib/utils/formattingHelper';
import mockData from '../storage/mock_data.json';

export const orderListHandlers = rest.get('/mock/order', (req, res, ctx) => {
  const offset = Number(req.url.searchParams.get('offset'));
  const limit = Number(req.url.searchParams.get('limit'));
  const date = req.url.searchParams.get('date');

  const dataOfSelectedDate = date
    ? mockData.filter((item) => item.transaction_time.split(' ')[0] === date)
    : mockData;

  return res(
    ctx.json({
      order: [...dataOfSelectedDate].splice(offset * limit, limit),
      orderCount: dataOfSelectedDate.length,
      totalCurrency: dataOfSelectedDate.reduce(
        (acc, cur) => acc + formatDollorToNumber(cur.currency),
        0,
      ),
    }),
  );
});
