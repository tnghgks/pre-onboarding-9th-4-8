import StatsArea from '@/components/StatsArea';
import OrderTableArea from '@/components/OrderTableArea';
import DatePicker from '@/components/DatePicker';

const AdminPage = () => {
  return (
    <>
      <StatsArea />
      <DatePicker />
      <OrderTableArea />
    </>
  );
};

export default AdminPage;
