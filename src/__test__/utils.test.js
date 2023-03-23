import { formatPageInfo } from '@/lib/utils/formatter';
import { generateStartAndEndDate } from '@/lib/utils/generator';

const fakeValue = [
  {
    id: 498,
    transaction_time: '2022-01-01 17:34:39',
    status: true,
    customer_id: 512,
    customer_name: 'Ulric Gibson',
    currency: '$59.78',
  },
  {
    id: 499,
    transaction_time: '2023-02-02 18:00:48',
    status: false,
    customer_id: 513,
    customer_name: 'Forrest Chaney',
    currency: '$41.48',
  },
  {
    id: 500,
    transaction_time: '2024-03-03 11:54:15',
    status: false,
    customer_id: 514,
    customer_name: 'Rama Sheppard',
    currency: '$0.46',
  },
];

describe('utils function test', () => {
  it('generateStartAndEndDate는 주어진 배열에서 시작 날짜와 종료 날짜를 반환합니다', () => {
    const [startDate, endDate] = generateStartAndEndDate(fakeValue);
    expect(startDate).toBe('2022-1-1');
    expect(endDate).toBe('2024-3-3');
  });

  it('formatPageInfo는 현재 불러온 페이지의 목록 개수 정보를 반홥합니다.', () => {
    const pageInfo = formatPageInfo(1, 50, 500);
    expect(pageInfo).toBe('Showing 1 - 50 out of 500');
  });
});
