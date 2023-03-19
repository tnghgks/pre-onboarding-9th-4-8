import { rest } from 'msw';
import mockData from '../storage/mock_data.json';

export const orderListHandlers = rest.get('/mock/order', (req, res, ctx) => {
  const offset = Number(req.url.searchParams.get('offset'));
  const limit = Number(req.url.searchParams.get('limit'));
  const date = req.url.searchParams.get('date');

  const dataOfSelectedDate = mockData.filter(
    (item) => item.transaction_time.split(' ')[0] === date,
  );
  const slicedData = dataOfSelectedDate.splice(offset * limit, limit);

  return res(
    ctx.json({ order: slicedData, orderCount: dataOfSelectedDate.length }),
  );
});
